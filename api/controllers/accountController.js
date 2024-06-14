import Account from '../models/Account.js';
import mongoose from 'mongoose';

const createAccount = async (req, res) => {
  const { bankAccountNumber, sortCode } = req.body;
  const userId = req.user.userId;
  try {
    const accountId = new mongoose.Types.ObjectId().toString();
    const account = new Account({ userId, accountId, bankAccountNumber, sortCode });
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deposit = async (req, res) => {
  const { accountId, amount } = req.body;
  try {
    const account = await Account.findOne({ accountId, userId: req.user.userId });
    if (!account || account.status !== 'ACTIVE' || !account.allowCredit) {
      return res.status(400).json({ message: 'Account cannot accept credits' });
    }
    account.balance += amount;
    account.transactions.push({ type: 'CREDIT', amount });
    await account.save();
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  const { accountId, amount } = req.body;
  try {
    const account = await Account.findOne({ accountId, userId: req.user.userId });
    if (!account || account.status !== 'ACTIVE' || !account.allowDebit) {
      return res.status(400).json({ message: 'Account cannot accept debits' });
    }
    const todayWithdrawals = account.transactions
      .filter(tx => tx.type === 'DEBIT' && new Date(tx.date).toDateString() === new Date().toDateString())
      .reduce((sum, tx) => sum + tx.amount, 0);
    if (todayWithdrawals + amount > account.dailyWithdrawalLimit) {
      return res.status(400).json({ message: 'Daily withdrawal limit exceeded' });
    }
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    account.balance -= amount;
    account.transactions.push({ type: 'DEBIT', amount });
    await account.save();
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBalance = async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await Account.findOne({ accountId, userId: req.user.userId });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createAccount, deposit, withdraw, getBalance };
