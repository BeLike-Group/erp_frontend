
import React, { useState } from 'react';

const Easypaisa= () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      phoneNumber,
      amount,
    };

    try {
      const response = await fetch('/api/easypaisa/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Payment Successful!');
      } else {
        alert('Payment Failed: ' + result.message);
      }
    } catch (error) {
      alert('Error processing payment: ' + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-200  min-h-screen flex items-center justify-center py-12 text-black">
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">
          EasyPaisa Payment
        </h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-6">
            <label
              htmlFor="phone-number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="03XX XXXXXXX"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (PKR)
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            >
              Pay with EasyPaisa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Easypaisa;
