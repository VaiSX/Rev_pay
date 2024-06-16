import React, { useEffect, useState } from 'react';
import { getAccounts } from '../api';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        alert('Error fetching accounts');
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Your Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account._id}>
            <p>Account Number: {account.bankAccountNumber}</p>
            <p>Sort Code: {account.sortCode}</p>
            <p>Status: {account.status}</p>
            <p>Credit Allowed: {account.allowCredit ? 'Yes' : 'No'}</p>
            <p>Debit Allowed: {account.allowDebit ? 'Yes' : 'No'}</p>
            <p>Daily Withdrawal Limit: {account.dailyWithdrawalLimit}</p>
            <p>Balance: {account.balance}</p>
            <p>Transactions:</p>
            <ul>
              {account.transactions.map((transaction, index) => (
                <li key={index}>
                  <p>Type: {transaction.type}</p>
                  <p>Amount: {transaction.amount}</p>
                  <p>Date: {new Date(transaction.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
