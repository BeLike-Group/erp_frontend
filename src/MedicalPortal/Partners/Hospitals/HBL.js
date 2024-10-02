    import { toast, ToastContainer } from 'react-toastify';
    import { MdCreditCard } from 'react-icons/md';
    import 'react-toastify/dist/ReactToastify.css';
    import { useState } from 'react';

    const HBL = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [amount, setAmount] = useState('');
    const [userName, setUserName] = useState('Ali Khan'); // Example User Name
    const [phoneNumber, setPhoneNumber] = useState('03001234567'); // Example Phone Number
    const [doctorName, setDoctorName] = useState('Dr. Ahmed'); // Example Doctor Name

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        const paymentData = {
        cardNumber,
        expirationDate,
        cvv,
        cardHolder,
        amount,
        };

        try {
        const response = await fetch('/api/hbl/payment', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (result.success) {
            toast.success(`Payment Successful! Your appointment is booked. \nName: ${userName} \nPhone: ${phoneNumber} \nDoctor: ${doctorName}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        } else {
            toast.error('Payment Failed: ' + result.message, {
            position: toast.POSITION.TOP_CENTER,
            });
        }
        } catch (error) {
        toast.error('Error processing payment: ' + error.message, {
            position: toast.POSITION.TOP_CENTER,
        });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 text-black bg-gradient-to-r from-green-200 to-blue-200 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
            <MdCreditCard className="mx-auto mb-4 text-4xl text-green-500" />
            <h2 className="text-3xl font-extrabold text-gray-900">HBL Payment</h2>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-6 ">
            <div className="space-y-1 ">
                <label
                htmlFor="card-number"
                className="block text-sm font-medium text-gray-700"
                >
                Card Number
                </label>
                <input
                type="text"
                id="card-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                >
                    Expiration Date
                </label>
                <input
                    type="text"
                    id="expiration-date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    placeholder="MM / YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>
                <div className="flex-1">
                <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                >
                    CVV
                </label>
                <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>
            </div>
            <div className="space-y-1">
                <label
                htmlFor="card-holder"
                className="block text-sm font-medium text-gray-700"
                >
                Card Holder
                </label>
                <input
                type="text"
                id="card-holder"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="space-y-1">
                <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
                >
                Amount (PKR)
                </label>
                <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <button
                type="submit"
                className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Pay Now
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default HBL;
