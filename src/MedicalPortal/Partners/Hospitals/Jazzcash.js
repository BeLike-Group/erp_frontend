import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Jazzcash = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Formats date and time as a string
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      phoneNumber,
      amount,
    };

    try {
      const response = await fetch('/api/jazzcash/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success toast
        toast.success('Payment Successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Show patient information toast with custom design and print button
        toast.info(
          <div className="p-6 bg-green-300 border border-gray-300 rounded-lg shadow-2xl">
            <h3 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b border-gray-300">Patient Information</h3>
            <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Name:</strong> ABC</p>
            <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Doctor Name:</strong> ABC</p>
            <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Date:</strong> {getCurrentDateTime().split(',')[0]}</p>
            <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Time:</strong> {getCurrentDateTime().split(',')[1]}</p>
            <p className="mb-4 text-sm text-gray-800"><strong className="font-medium text-blue-600">Amount:</strong> 1500</p>
            <button
              onClick={handlePrint}
              className="px-4 py-2 font-semibold text-white transition-colors duration-300 bg-green-600 rounded-lg hover:bg-blue-700"
            >
              Print Card
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      } else {
        toast.error('Payment Failed: ' + result.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('Error processing payment: ' + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Card</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h3>Patient Information</h3>');
    printWindow.document.write('<p>Name: ABC</p>');
    printWindow.document.write('<p>Doctor Name: ABC</p>');
    printWindow.document.write('<p>Date and Time:</p>');
    printWindow.document.write('<p>' + getCurrentDateTime() + '</p>');
    printWindow.document.write('<p>Amount: 1500</p>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gradient-to-r from-green-200 to-blue-200">
      <div className="w-full max-w-md p-6 mx-auto bg-white shadow-xl rounded-2xl">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-700">
          JazzCash Payment
        </h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-6">
            <label
              htmlFor="phone-number"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="03XX XXXXXXX"
              className="w-full px-4 py-3 transition duration-200 ease-in-out border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Amount (PKR)
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-3 transition duration-200 ease-in-out border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition duration-300 ease-in-out transform bg-red-600 rounded-lg focus:outline-none hover:scale-105"
            >
              Pay with JazzCash
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        rtl={false}
        className="!top-4 !right-4"
      />
    </div>
  );
};

export default Jazzcash;
