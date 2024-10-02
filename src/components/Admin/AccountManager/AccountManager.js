import React, { useState, useEffect } from 'react';
import TransactionModal from './TransactionModal';
import TransactionTable from './TransactionTable';
import DateRangeFilter from './DateRangeFilter';
import CSVDownload from './CSVDownload';
import axios from 'axios';

export const AccountManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null); // For handling updates

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const response = await axios.get("/api/v1/admin/getalltransaction");
        setTransactions(response.data.data);
        setFilteredTransactions(response.data.data);
        setTotalBalance(calculateTotalBalance(response.data.data));
        setLoading(false);
      } catch (error) {
        setError('Failed to load transactions');
        setLoading(false);
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchAllTransactions();
  }, [transactions]);

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post('/api/v1/admin/createtransaction', transaction);
      const newTransaction = response.data.data;
      const newTransactions = [...transactions, newTransaction];
      setTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setTotalBalance(calculateTotalBalance(newTransactions));
      setModalOpen(false);
    } catch (error) {
      setError('Failed to add transaction');
      console.error(error.response?.data?.message || error.message);
    }
  };

  const updateTransaction = async (updatedTransaction) => {
    try {
      const response = await axios.put(`/api/v1/admin/updatetransaction/${updatedTransaction.id}`, updatedTransaction);
      const newTransactions = transactions.map(transaction =>
        transaction.id === updatedTransaction.id ? response.data.data : transaction
      );
      setTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setTotalBalance(calculateTotalBalance(newTransactions));
      setEditingTransaction(null); // Clear editing state
      setModalOpen(false);
    } catch (error) {
      setError('Failed to update transaction');
      console.error(error.response?.data?.message || error.message);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`/api/v1/admin/deletetransaction/${transactionId}`);
      const newTransactions = transactions.filter(transaction => transaction.id !== transactionId);
      setTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setTotalBalance(calculateTotalBalance(newTransactions));
    } catch (error) {
      setError('Failed to delete transaction');
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleFilter = (startDate, endDate) => {
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  function calculateTotalBalance(transactions) {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'Income'
        ? total + parseFloat(transaction.amount)
        : total - parseFloat(transaction.amount);
    }, 0);
  }

  if (loading) {
    return <div className="text-white">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-blue-900 min-h-screen">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white">Total Account Balance: Rs:{totalBalance}</h3>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-600 text-white py-2 px-6 rounded-lg mb-6 hover:bg-green-500 transition-colors duration-200 shadow-md"
      >
        Add New Transaction
      </button>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTransaction(null); // Clear editing state when closing
        }}
        onSave={editingTransaction ? updateTransaction : addTransaction} // Switch between add and update
        editingTransaction={editingTransaction} // Pass transaction to edit
      />

      <DateRangeFilter onFilter={handleFilter} />
      <div className="mt-6 overflow-x-auto">
        <TransactionTable
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onUpdate={openEditModal} // Open modal for updating
        />
      </div>
      <div className="mt-6">
        <CSVDownload transactions={filteredTransactions} totalBalance={totalBalance} />
      </div>
    </div>
  );
};

export default AccountManager;
