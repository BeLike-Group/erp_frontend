// TransactionModal.jsx
import React, { useState, useEffect } from "react";

const TransactionModal = ({ isOpen, onClose, onSave, editingTransaction }) => {
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    description: "",
    type: "Income",
    date: new Date().toISOString().slice(0, 10),
  });

  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setTransaction(editingTransaction);
    } else {
      setTransaction({
        name: "",
        amount: "",
        description: "",
        type: "Income",
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", amount: "", description: "" };

    if (!transaction.name.trim()) {
      newErrors.name = "Transaction name is required";
      isValid = false;
    }

    if (!transaction.amount || transaction.amount <= 0) {
      newErrors.amount = "Amount should be a positive number";
      isValid = false;
    }

    if (!transaction.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(transaction);
      // Remove onClose() here because onSave already handles closing
      // onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative h-auto overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name of Transaction
            </label>
            <input
              type="text"
              name="name"
              value={transaction.name}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.name ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount (Rs:)
            </label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.amount ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              required
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={transaction.description}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.description ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          {/* Transaction Type Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Transaction Type
            </label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="Income">Income</option>
              <option value="Expenditure">Expenditure</option>
            </select>
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Transaction
            </label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              {editingTransaction ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
