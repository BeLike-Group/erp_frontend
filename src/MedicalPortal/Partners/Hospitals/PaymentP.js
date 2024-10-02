import React, { useState } from 'react';
import { MdOutlinePayment } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentP = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Formats date and time as a string
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Submitted:', { cardNumber, expirationDate, cvv, cardHolder });

    // Get the current date and time
    const currentDateTime = getCurrentDateTime();

    // Show payment received message
    toast.success('Payment Received', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-success",
    });

    // Show patient information toast with a card-like design
    toast.info(
      <div className="p-6 bg-green-300 border border-gray-300 rounded-lg shadow-2xl">
        <h3 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b border-gray-300">Patient Information</h3>
        <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Name:</strong> ABC</p>
        <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Doctor Name:</strong> ABC</p>
        <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Date:</strong> {currentDateTime.split(',')[0]}</p>
        <p className="mb-3 text-sm text-gray-800"><strong className="font-medium text-blue-600">Time:</strong> {currentDateTime.split(',')[1]}</p>
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
        progress: undefined,
        className: "toast-custom-info",
      }
    );

    // Clear form fields after submission (optional)
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setCardHolder('');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Card</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h3>Patient Information</h3>');
    printWindow.document.write('<table style="width:100%; border-collapse:collapse; border: 1px solid #ddd;">');
    printWindow.document.write('<tr><th style="border: 1px solid #ddd; padding: 8px;">Field</th><th style="border: 1px solid #ddd; padding: 8px;">Value</th></tr>');
    printWindow.document.write('<tr><td style="border: 1px solid #ddd; padding: 8px;">Name</td><td style="border: 1px solid #ddd; padding: 8px;">ABC</td></tr>');
    printWindow.document.write('<tr><td style="border: 1px solid #ddd; padding: 8px;">Doctor Name</td><td style="border: 1px solid #ddd; padding: 8px;">ABC</td></tr>');
    printWindow.document.write('<tr><td style="border: 1px solid #ddd; padding: 8px;">Date</td><td style="border: 1px solid #ddd; padding: 8px;">' + getCurrentDateTime().split(',')[0] + '</td></tr>');
    printWindow.document.write('<tr><td style="border: 1px solid #ddd; padding: 8px;">Time</td><td style="border: 1px solid #ddd; padding: 8px;">' + getCurrentDateTime().split(',')[1] + '</td></tr>');
    printWindow.document.write('<tr><td style="border: 1px solid #ddd; padding: 8px;">Amount</td><td style="border: 1px solid #ddd; padding: 8px;">1500</td></tr>');
    printWindow.document.write('</table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gradient-to-r from-teal-100 to-indigo-200">
      <div className="w-full max-w-lg p-6 mx-auto transition-transform duration-300 ease-in-out transform bg-white shadow-xl rounded-2xl hover:scale-105">
        <div className="flex items-center justify-center mb-8">
          <MdOutlinePayment className="mr-2 text-4xl text-blue-700" />
          <h2 className="text-3xl font-bold text-gray-800">Payment Information</h2>
        </div>
        <form onSubmit={handlePaymentSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="card-number"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                name="card-number"
                id="card-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="expiration-date"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Expiration Date
              </label>
              <input
                type="text"
                name="expiration-date"
                id="expiration-date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                placeholder="MM / YY"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="000"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="card-holder"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Card Holder
              </label>
              <input
                type="text"
                name="card-holder"
                id="card-holder"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="!top-4 !right-4"
      />
    </div>
  );
};

export default PaymentP;
