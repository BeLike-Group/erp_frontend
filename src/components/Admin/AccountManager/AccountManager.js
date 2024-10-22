import React, { useState, useEffect } from "react";
import TransactionModal from "./TransactionModal";
import TransactionTable from "./TransactionTable";
import DateRangeFilter from "./DateRangeFilter";
import CSVDownload from "./CSVDownload";
import axios from "axios";

export const AccountManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      const [transactionResponse, studentFeeResponse, salarySlipResponse] =
        await Promise.all([
          axios.get("/api/v1/admin/getalltransaction"),
          axios.get("/api/v1/admin/get-student-fee"),
          axios.get("/api/v1/admin/teacher-slip"),
        ]);

      const allTransactions = [
        ...transactionResponse.data.data,
        ...studentFeeResponse.data.data.map((fee) => ({
          _id: fee._id,
          name: fee.studentName,
          type: "Income",
          amount: fee.amountPaid || 0,
          description: "Updated fee record",
          date: fee.submissionDate || fee.updatedAt || fee.date || new Date(),
        })),
        ...salarySlipResponse.data.map((slip) => ({
          _id: slip._id,
          name: slip.name,
          type: "Expenditure",
          amount: slip.salary || 0,
          description: slip.designation,
          date: slip.date || new Date(),
        })),
      ];

      // Remove duplicates based on _id
      const uniqueTransactions = Array.from(
        new Map(
          allTransactions.map((transaction) => [transaction._id, transaction])
        ).values()
      );

      setTransactions(uniqueTransactions);
      setFilteredTransactions(uniqueTransactions);
      setTotalBalance(calculateTotalBalance(uniqueTransactions));
    } catch (error) {
      setError("Failed to load transactions");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post(
        "/api/v1/admin/createtransaction",
        transaction
      );
      const newTransaction = response.data.data;

      if (!transactions.some((t) => t._id === newTransaction._id)) {
        setTransactions((prev) => [...prev, newTransaction]);
        setFilteredTransactions((prev) => [...prev, newTransaction]);
        setTotalBalance((prev) =>
          newTransaction.type === "Income"
            ? prev + parseFloat(newTransaction.amount)
            : prev - parseFloat(newTransaction.amount)
        );
      }
      setModalOpen(false);
    } catch (error) {
      setError("Failed to add transaction");
    }
  };

  const updateTransaction = async (updatedTransaction) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/updatetransaction/${updatedTransaction._id}`,
        updatedTransaction
      );
      const newTransactions = transactions.map((transaction) =>
        transaction._id === updatedTransaction._id
          ? response.data.data
          : transaction
      );

      setTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setTotalBalance(calculateTotalBalance(newTransactions));
      setEditingTransaction(null);
      setModalOpen(false);
    } catch (error) {
      setError("Failed to update transaction");
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`/api/v1/admin/deletetransaction/${transactionId}`);
      const newTransactions = transactions.filter(
        (transaction) => transaction._id !== transactionId
      );
      setTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setTotalBalance(calculateTotalBalance(newTransactions));
    } catch (error) {
      setError("Failed to delete transaction");
    }
  };

  const handleFilter = (startDate, endDate) => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const calculateTotalBalance = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "Income"
        ? total + parseFloat(transaction.amount)
        : total - parseFloat(transaction.amount);
    }, 0);
  };

  if (loading) {
    return <div className="text-white">Loading transactions...</div>;
  }

  return (
    <div className="p-6 bg-blue-900 min-h-screen">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white">
          Total Account Balance: Rs: {totalBalance}
        </h3>
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
          setEditingTransaction(null);
        }}
        onSave={editingTransaction ? updateTransaction : addTransaction}
        editingTransaction={editingTransaction}
      />

      <DateRangeFilter onFilter={handleFilter} />
      <div className="mt-6 overflow-x-auto">
        <TransactionTable
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onUpdate={openEditModal}
          disableActions={(transaction) => transaction.type === "Income"}
        />
      </div>
      <div className="mt-6">
        <CSVDownload
          transactions={filteredTransactions}
          totalBalance={totalBalance}
        />
      </div>
    </div>
  );
};

export default AccountManager;
