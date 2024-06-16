import { useState } from 'react';
import { createAccount } from '../api';

const CreateAccountForm = ({ token }) => {
  const [formData, setFormData] = useState({
    bankAccountNumber: '',
    sortCode: '',
    activationStatus: 'ACTIVE',
    allowedTransactions: 'BOTH',
    dailyWithdrawalLimit: 1000,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccount(formData, token);
      alert('Account created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating account');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
          <input
            type="text"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            maxLength="10"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sort Code</label>
          <input
            type="text"
            name="sortCode"
            value={formData.sortCode}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            maxLength="8"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Activation Status</label>
          <select
            name="activationStatus"
            value={formData.activationStatus}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Allowed Transactions</label>
          <select
            name="allowedTransactions"
            value={formData.allowedTransactions}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="BOTH">BOTH</option>
            <option value="CREDIT">CREDIT</option>
            <option value="DEBIT">DEBIT</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Daily Withdrawal Limit</label>
          <input
            type="number"
            name="dailyWithdrawalLimit"
            value={formData.dailyWithdrawalLimit}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
