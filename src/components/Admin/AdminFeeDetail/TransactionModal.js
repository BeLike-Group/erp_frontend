import React, { useState } from "react";

const TransactionModal = ({ isOpen, onClose, onSave }) => {
  const [transaction, setTransaction] = useState({
    studentName: "",
    rollNumber: "",
    grade: "",
    totalFees: "",
    amountPaid: "",
    remainingAmount: 0, // Calculated field
    status: "", // 'Fully Paid' or 'Remaining'
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedTransaction = { ...transaction, [name]: value };

    // Calculate the remaining amount and status
    if (name === "totalFees" || name === "amountPaid") {
      const totalFees =
        name === "totalFees" ? Number(value) : Number(transaction.totalFees);
      const amountPaid =
        name === "amountPaid" ? Number(value) : Number(transaction.amountPaid);
      const remainingAmount = totalFees - amountPaid;
      const status = remainingAmount === 0 ? "Fully Paid" : "Remaining";
      updatedTransaction = { ...updatedTransaction, remainingAmount, status };
    }

    setTransaction(updatedTransaction);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(transaction);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative h-3/4 overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add Fee Record
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={transaction.studentName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Roll Number
            </label>
            <input
              type="text"
              name="rollNumber"
              value={transaction.rollNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Grade
            </label>
            <input
              type="text"
              name="grade"
              value={transaction.grade}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Fees (Rs:)
            </label>
            <input
              type="number"
              name="totalFees"
              value={transaction.totalFees}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount Paid (Rs:)
            </label>
            <input
              type="number"
              name="amountPaid"
              value={transaction.amountPaid}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Remaining Amount (Rs:)
            </label>
            <input
              type="number"
              name="remainingAmount"
              value={transaction.remainingAmount}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={transaction.status}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            />
          </div>
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
