import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I schedule an appointment at the hospital?',
      answer: 'You can schedule an appointment by visiting our website or calling our appointment hotline. Walk-ins are also welcome, but appointments are recommended to avoid long wait times.',
    },
    {
      question: 'What should I bring for my first visit?',
      answer: 'Please bring your ID card, insurance information, and any relevant medical records. It’s also helpful to have a list of any medications you are currently taking.',
    },
    {
      question: 'How can I get my medical records?',
      answer: 'You can request your medical records from the hospital’s records department either in person or by submitting a request form online. Please allow a few days for processing.',
    },
    {
      question: 'Do you offer emergency services?',
      answer: 'Yes, our hospital provides 24/7 emergency services. Our emergency department is fully equipped to handle all types of medical emergencies.',
    },
    {
      question: 'What insurance plans do you accept?',
      answer: 'We accept most major insurance plans. Please contact our billing department to verify if your insurance is accepted. We also offer payment plans for uninsured patients.',
    },
    {
      question: 'Can I change my doctor after the first consultation?',
      answer: 'Yes, you can request to change your doctor at any time. Please contact the patient services department to assist with this process.',
    },
    {
      question: 'What are the visiting hours for patients?',
      answer: 'Visiting hours are from 10 AM to 8 PM daily. However, in critical care units, visiting hours may be limited to ensure patient care and recovery.',
    },
    {
      question: 'How do I prepare for surgery?',
      answer: 'Before surgery, follow the instructions provided by your doctor, which may include fasting and medication restrictions. Make sure to arrange for someone to drive you home after the procedure.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=''>
    <div className="max-w-4xl p-8 mx-auto ">
      <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">Hospital & Patient FAQs</h2>
      <div className="space-y-6 ">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="transition-transform transform border border-gray-300 rounded-lg shadow-lg hover:scale-105"
          >
            <button
              className={`w-full flex justify-between items-center p-6 bg-green-500 rounded-lg ${
                activeIndex === index ? 'shadow-inner' : ''
              } hover:bg-green-500 focus:outline-none transition duration-300`}
              onClick={() => toggleFAQ(index)}
            >
              <span
                className={`text-lg font-semibold ${
                  activeIndex === index ? 'text-blue-600' : 'text-gray-800'
                } transition duration-300`}
              >
                {faq.question}
              </span>
              <span className="text-gray-500">
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {activeIndex === index && (
              <div
                className="p-6 text-gray-700 transition duration-300 rounded-b-lg bg-gray-50 hover:bg-gray-100"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ