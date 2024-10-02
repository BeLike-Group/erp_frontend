import React, { useState } from 'react';
import { IoMdPerson } from 'react-icons/io';
import { FaWhatsapp } from 'react-icons/fa'
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleSelection = (method) => {
    setSelectedMethod(method);
    if (method === 'bank') {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  };

  const handlePayment = () => {
    switch (selectedMethod) {
      case 'credit':
        navigate('/credit-card-payment');
        break;
      case 'jazzcash':
        navigate('/jazzcash-payment');
        break;
      case 'easypaisa':
        navigate('/easypaisa-payment');
        break;
      case 'hbl':
        navigate('/hbl-transfer-payment');
        break;
      case 'bank':
        navigate('/bank-transfer-payment');
        break;
      default:
        break;
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '923407886839'; // Replace with your WhatsApp number
    const message = encodeURIComponent('Hello, I have completed the payment. Here is the screenshot.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  return (
    <div className="flex flex-col p-10 pl-20 text-black bg-white md:flex-row">
      <div className="pl-10 pt-4 pb-5 pr-5 md:w-[45%] border-1 border-gray-300 rounded-xl bg-gray-300">
        <h2 className="mb-6 text-2xl font-bold">Choose a Payment Method</h2>
        <div className="space-y-4">
          <div
            className={`flex items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer ${
              selectedMethod === 'credit' ? 'border-2 border-blue-600' : ''
            }`}
            onClick={() => handleSelection('credit')}
          >
            <img src="https://oladoc.com/dist/images/visa-mastercard.png" alt="Credit Card" className="w-12 h-12 mr-4" />
            <div className="flex-1">
              <p className="text-lg font-medium">Pay via Credit / Debit (ATM) Card</p>
              <span className="text-sm text-gray-500">Rs. 200 OFF</span>
            </div>
            <input type="radio" className="hidden" checked={selectedMethod === 'credit'} readOnly />
          </div>
          <div
            className={`flex items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer ${
              selectedMethod === 'jazzcash' ? 'border-2 border-green-600' : ''
            }`}
            onClick={() => handleSelection('jazzcash')}
          >
            <img src="https://oladoc.com/dist/images/jazz-cash-tab-logo.png" alt="JazzCash" className="w-12 h-12 mr-4" />
            <div className="flex-1">
              <p className="text-lg font-medium">JazzCash Mobile Wallet</p>
              <span className="text-sm text-gray-500">Rs. 200 OFF</span>
            </div>
            <input type="radio" className="hidden" checked={selectedMethod === 'jazzcash'} readOnly />
          </div>
          <div
            className={`flex items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer ${
              selectedMethod === 'easypaisa' ? 'border-2 border-orange-600' : ''
            }`}
            onClick={() => handleSelection('easypaisa')}
          >
            <img src="https://oladoc.com/dist/images/easy-paisa-icon.png" alt="Easypaisa" className="w-12 h-12 mr-4" />
            <div className="flex-1">
              <p className="text-lg font-medium">Easypaisa Mobile Wallet</p>
              <span className="text-sm text-gray-500">Rs. 200 OFF</span>
            </div>
            <input type="radio" className="hidden" checked={selectedMethod === 'easypaisa'} readOnly />
          </div>
          <div
            className={`flex items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer ${
              selectedMethod === 'hbl' ? 'border-2 border-gray-800' : ''
            }`}
            onClick={() => handleSelection('hbl')}
          >
            <img src="https://oladoc.com/dist/images/hbl-logo.png" alt="HBL" className="w-12 h-8 mr-4" />
            <div className="flex-1">
              <p className="text-lg font-medium">HBL Direct Transfer</p>
              <span className="text-sm text-gray-500">Rs. 200 OFF</span>
            </div>
            <input type="radio" className="hidden" checked={selectedMethod === 'hbl'} readOnly />
          </div>
          <div
            className={`flex items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer ${
              selectedMethod === 'bank' ? 'border-2 border-gray-700' : ''
            }`}
            onClick={() => handleSelection('bank')}
          >
            <img src="https://oladoc.com/dist/images/bank-transfer.png" alt="Bank Transfer" className="w-12 h-12 mr-4" />
            <div className="flex-1">
              <p className="text-lg font-medium">Bank Transfer (from any bank)</p>
            </div>
            <input type="radio" className="hidden" checked={selectedMethod === 'bank'} readOnly />
          </div>
          {selectedMethod === 'bank' && showDetails && (
            <div className="p-4 mt-6 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-lg">
              <h1 className="mb-2 text-lg font-bold">Bank Transfer Details</h1>
              <h2 className="mb-1 text-sm"><strong>Account Number:</strong> 1060038503</h2>
              <h2 className="mb-1 text-sm"><strong>Account Title:</strong> Belike</h2>
              <h2 className="mb-1 text-sm"><strong>Bank:</strong> Habib Bank Ltd (Garden Town Branch)</h2>
              <h2 className="mb-1 text-sm"><strong>IBAN:</strong> PK68 HABB 0010607901038503</h2>
              <h1 className="mt-4 text-sm">After transferring Rs. 5,800, please take a screenshot of the completed transaction and send it to <a href="tel:03000647873" className="text-blue-600 hover:underline">03000647873</a> via WhatsApp.</h1>
              <div className="relative inline-flex mt-4 group">
                <div
                  className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
                ></div>
                <button
                  onClick={handleWhatsAppClick}
                  className="relative flex items-center justify-center w-full px-5 py-3 font-bold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  Contact via WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Changed your mind about paying online?
          <NavLink to="/appointments" className="text-blue-600 hover:underline">
            Click here to go back
          </NavLink>
        </p>
      </div>
      <div className="p-6 mt-24 ml-24 md:w-2/5">
        <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <IoMdPerson className="w-12 h-12 mr-4 text-gray-800" />
            <div>
              <p className="text-lg font-medium">Dr. Hameed Tajammal Khan</p>
              <p className="text-sm text-gray-600">Doctors Hospital</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center text-gray-600">
              <AiOutlineCalendar className="w-5 h-5 mr-2" />
              <p className="text-sm">Aug 15, 12:30pm</p>
            </div>
          </div>
          <p className="mb-4 text-4xl font-bold text-gray-800">Rs. 5,800</p>
          
          <div className="relative inline-flex group">
            <div
              className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#82ff44] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
            ></div>
            <button
              onClick={handlePayment}
              className={`relative flex items-center justify-center w-full px-5 py-3 font-bold text-white transition rounded-lg ${
                selectedMethod ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedMethod}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v3a1 1 0 001 1h1a1 1 0 000-2h-.586l.293-.293a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414l2 2a1 1 0 101.414-1.414L10.414 9H11a1 1 0 100-2h-1z" clipRule="evenodd" />
              </svg>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

