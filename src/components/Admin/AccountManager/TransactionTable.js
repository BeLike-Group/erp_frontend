import React from 'react';

const TransactionTable = ({ transactions, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-dark-blue text-white shadow-lg">
        <thead>
          <tr className="bg-blue-900 text-left">
            <th className="py-3 px-6 border-b border-gray-700">Transaction Name</th>
            <th className="py-3 px-6 border-b border-gray-700">Type</th>
            <th className="py-3 px-6 border-b border-gray-700">Amount (Rs:)</th>
            <th className="py-3 px-6 border-b border-gray-700">Description</th>
            <th className="py-3 px-6 border-b border-gray-700">Date</th>
            <th className="py-3 px-6 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="bg-blue-800 hover:bg-blue-700 transition-colors duration-200">
              <td className="py-3 px-6 border-b border-gray-700">{transaction.name}</td>
              <td className="py-3 px-6 border-b border-gray-700">{transaction.type}</td>
              <td className={`py-3 px-6 border-b border-gray-700 ${transaction.type === 'Expenditure' ? 'text-red-400' : 'text-green-400'}`}>
                Rs:{transaction.amount}
              </td>
              <td className="py-3 px-6 border-b border-gray-700">{transaction.description}</td>
              <td className="py-3 px-6 border-b border-gray-700">{transaction.date}</td>
              <td className="py-3 px-6 border-b border-gray-700">
                {/* <button
                  onClick={() => onUpdate(transaction)}
                  className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors duration-200"
                >
                  Update
                </button> */}
                <button
                  onClick={() => onDelete(transaction._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
