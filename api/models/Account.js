import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true },

  accountId: { 
    type: String,
    required: true,
    unique: true },

  bankAccountNumber: { 
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/ },

  sortCode: {
    type: String,
    required: true,
    match: /^\d{8}$/ },

  status: { 
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE' },

  allowCredit: {
    type: Boolean,
    default: true },

  allowDebit: { 
    type: Boolean,
    default: true },

  balance: {
    type: Number,
    default: 0 },

  dailyWithdrawalLimit: {
    type: Number,
    default: 1000 },

  transactions: [
    {
      type: { type: String, enum: ['CREDIT', 'DEBIT'] },
      amount: { type: Number },
      date: { type: Date, default: Date.now }
    }
  ]
});


export default mongoose.model('Account', accountSchema);
