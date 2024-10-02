import React from 'react';
import { CSVLink } from 'react-csv';

const CSVDownload = ({ transactions, totalBalance }) => {
  const headers = [
    { label: 'Transaction Name', key: 'name' },
    { label: 'Type', key: 'type' },
    { label: 'Amount (Rs:)', key: 'amount' },
    { label: 'Description', key: 'description' },
    { label: 'Date', key: 'date' },
  ];

  const dataWithTotal = [
    ...transactions,
    {
      name: 'Total Balance',
      type: '',
      amount: `Rs:${totalBalance}`,
      description: '',
      date: '',
    },
  ];

  return (
    <CSVLink
      data={dataWithTotal}
      headers={headers}
      filename="school_accounts.csv"
      className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 inline-block hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Download Excel File
    </CSVLink>
  );
};

export default CSVDownload;
