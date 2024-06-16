import { useState } from 'react';
import { createTransaction } from '../api';

const TransactionForm = ({ token }) => {
  const [formData, setFormData] = useState({
    accountId: '',
    amount: '',
    type: 'CREDIT',
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
      await createTransaction(formData, token);
      alert('Transaction successful');
    } catch (error) {
      console.error(error);
      alert('Error creating transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Account ID</label>
          <input
            type="text"
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="CREDIT">CREDIT</option>
            <option value="DEBIT">DEBIT</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Create Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
