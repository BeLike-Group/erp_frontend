import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddReminder = () => {
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("email");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [customRecipient, setCustomRecipient] = useState(""); // Dynamic custom recipient
  const [recipients, setRecipients] = useState([]);
  const [isSending, setIsSending] = useState(false); // Loading state

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        let response;
        if (recipientType === "email") {
          response = await axios.get(`/api/v1/student/emails`);
        } else if (recipientType === "phone" || recipientType === "whatsapp") {
          response = await axios.get(`/api/v1/student/phones`);
        }
        setRecipients(response.data);
      } catch (error) {
        console.error("Error fetching recipients:", error);
        toast.error("Failed to fetch recipients");
      }
    };

    fetchRecipients();
  }, [recipientType]);

  const handleSendReminder = async () => {
    if (selectedRecipients.length === 0) {
      toast.error("No recipients selected");
      return;
    }

    setIsSending(true); // Start loading

    try {
      const response = await axios.post(`/api/v1/reminder/send-reminder`, {
        message,
        recipientType,
        recipients: selectedRecipients,
      });

      console.log("Send Reminder response:", response);

      // Check if the response indicates success
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `${
            recipientType.charAt(0).toUpperCase() + recipientType.slice(1)
          } messages sent!`
        );
        // Reset the form after sending
        setMessage("");
        setSelectedRecipients([]);
        setCurrentRecipient("");
        setCustomRecipient("");
      } else {
        // Handle unexpected status codes
        toast.error(
          `Unexpected response status: ${response.status}. Please try again.`
        );
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      // Extract error message from response if available
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send messages";
      toast.error(`Failed to send messages: ${errorMessage}`);
    } finally {
      setIsSending(false); // End loading
    }
  };

  const handleAddRecipient = () => {
    const trimmedRecipient = customRecipient.trim();

    if (!trimmedRecipient) {
      toast.error("Recipient cannot be empty");
      return;
    }

    // Validation based on recipientType
    let isValid = false;
    if (recipientType === "email") {
      // Simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(trimmedRecipient);
      if (!isValid) {
        toast.error("Invalid email format");
        return;
      }
    } else if (recipientType === "phone" || recipientType === "whatsapp") {
      // Simple phone number regex (E.164 format)
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      isValid = phoneRegex.test(trimmedRecipient);
      if (!isValid) {
        toast.error("Invalid phone number format");
        return;
      }
    }

    if (!selectedRecipients.includes(trimmedRecipient)) {
      setSelectedRecipients([...selectedRecipients, trimmedRecipient]);
      setCustomRecipient("");
    } else {
      toast.warn("Recipient already added");
    }
  };

  const handleRecipientTypeChange = (e) => {
    setRecipientType(e.target.value);
    setSelectedRecipients([]);
    setCurrentRecipient("");
    setCustomRecipient("");
  };

  const handleRemoveRecipient = (recipientToRemove) => {
    setSelectedRecipients((prev) =>
      prev.filter((recipient) => recipient !== recipientToRemove)
    );
  };

  const handleAddSelectedRecipient = () => {
    if (currentRecipient) {
      if (!selectedRecipients.includes(currentRecipient)) {
        setSelectedRecipients([...selectedRecipients, currentRecipient]);
        setCurrentRecipient("");
      } else {
        toast.warn("Recipient already added");
      }
    } else {
      toast.error("No recipient selected");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400 text-black">
      <div className="w-11/12 md:w-3/4 lg:w-1/2 p-6 bg-blue-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Send Reminder</h2>

        {/* Recipient Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Type
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={recipientType}
            onChange={handleRecipientTypeChange}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        {/* Select Recipient from List */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Recipient
          </label>
          <div className="flex">
            <select
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={currentRecipient}
              onChange={(e) => setCurrentRecipient(e.target.value)}
            >
              <option value="">Select a recipient</option>
              {recipients.map((recipient, index) => (
                <option key={index} value={recipient.email || recipient.phone}>
                  {recipient.email || recipient.phone}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddSelectedRecipient}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Enter Custom Recipient */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Custom{" "}
            {recipientType.charAt(0).toUpperCase() + recipientType.slice(1)}
          </label>
          <div className="flex">
            <input
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={customRecipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
              placeholder={`Enter custom ${recipientType}`}
            />
            <button
              onClick={handleAddRecipient}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Selected Recipients */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Recipients
          </label>
          <div className="border border-gray-300 rounded p-2 max-h-40 overflow-y-auto">
            {selectedRecipients.length > 0 ? (
              selectedRecipients.map((recipient, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <span>{recipient}</span>
                  <button
                    onClick={() => handleRemoveRecipient(recipient)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No recipients selected</div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          ></textarea>
        </div>

        {/* Send Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSendReminder}
            className={`w-full py-2 px-4 ${
              isSending
                ? "bg-gray-500 cursor-not-allowed"
                : recipientType === "whatsapp"
                ? "bg-green-500 hover:bg-green-600"
                : recipientType === "email"
                ? "bg-blue-500 hover:bg-blue-600"
                : recipientType === "phone"
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white rounded`}
            disabled={
              isSending ||
              !["email", "phone", "whatsapp"].includes(recipientType)
            }
          >
            {isSending
              ? "Sending..."
              : `Send ${
                  recipientType.charAt(0).toUpperCase() + recipientType.slice(1)
                }`}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminAddReminder;
