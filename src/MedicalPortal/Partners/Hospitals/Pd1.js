import React, { useState } from 'react';
import { FaCalendarCheck, FaLock, FaUserShield, FaCheckCircle, FaClock, FaBriefcase, FaSmile } from 'react-icons/fa';
import { FaHospitalAlt, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from './Time';

const Pd1 = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(prev => !prev);
  };
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: 'How can I get started?',
      answer: 'Getting started is easy! Sign up for an account, and you\'ll have access to our platform\'s features. No credit card required for the initial signup.',
    },
    {
      question: 'What is the pricing structure?',
      answer: 'Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive customer support. You can reach out to our support team through various channels, including email, chat, and a knowledge base.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time without any hidden fees. We believe in providing a hassle-free experience for our users.',
    },
  ];
  // const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility

  // const handleToggleDetails = () => {
  //   setShowDetails(prevState => !prevState);
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-4 bg-white md:p-20">
      <div className="flex flex-col gap-8 p-4 md:m-20 md:flex-row">
  {/* Doctor Info */}
  <motion.div
    className="flex-1 fade-in show"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col md:flex-row">
      <img
        src="https://avatars.mds.yandex.net/i?id=e39407a676731757ba68dcb4afc540bfdfb6e710-4730430-images-thumbs&n=13"
        alt="Doctor"
        className="mb-4 rounded-full w-36 h-36 md:w-52 md:h-52 md:mr-4"
      />
      <div className="text-center md:text-left">
        <h1 className="text-xl font-bold text-black mt-14 md:text-2xl">
          Prof. Dr. Muhammad Saleem Akhtar
        </h1>
        <p className="mt-2 text-lg font-semibold text-gray-900 md:text-2xl">Urologist</p>
        <p className="text-base font-semibold text-gray-900 md:text-xl">MBBS, MS (Urology)</p>
      </div>
    </div>
    <div className="mt-8">
      {/* Skills Section - Aligned in one line on mobile */}
      <div className="flex flex-col gap-4 text-center sm:flex-row sm:justify-between sm:gap-4">
    <motion.div
      className="flex flex-col sm:flex-1"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FaClock className="mx-auto mb-2 text-2xl text-blue-500" />
      <p className="text-lg font-semibold text-gray-900 sm:text-xl">Wait Time</p>
      <p className="text-gray-600">15-30 Min</p>
    </motion.div>
    <motion.div
      className="flex flex-col sm:flex-1"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FaBriefcase className="mx-auto mb-2 text-2xl text-blue-500" />
      <p className="text-lg font-semibold text-gray-900 sm:text-xl">Experience</p>
      <p className="text-gray-600">34 Years</p>
    </motion.div>
    <motion.div
      className="flex flex-col sm:flex-1"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FaSmile className="mx-auto mb-2 text-2xl text-blue-500" />
      <p className="text-lg font-semibold text-gray-900 sm:text-xl">Satisfied Patients</p>
      <p className="text-gray-600">98% (114)</p>
    </motion.div>
  </div>
    </div>
  </motion.div>

  {/* Card Detail */}
  <motion.div
    className="flex-1"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
   <div className="p-4 bg-white rounded-lg shadow-lg md:p-6 md:w-[34%] md:fixed top-14 right-4 left-4 md:right-16 md:left-auto z-10">
      <div className="flex fade-right show">
        <FaHospitalAlt className="w-5 h-5 text-orange-500 md:w-6 md:h-6" />
        <h3 className="ml-2 text-lg font-bold text-black md:text-xl">Doctors Hospital</h3>
      </div>
      <div className="mt-4">
        <div className="flex ">
          <FaDollarSign className="mr-2 text-lg text-green-600 md:text-xl" />
          <div>
            <p className="text-gray-600">Fee:</p>
            <p className="font-bold text-gray-800">Rs. 4,000</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex ">
          <FaMapMarkerAlt className="mr-2 text-lg text-green-600 md:text-xl" />
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="font-bold text-gray-800">152 A-G/1, Canal Bank, Johar Town.</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex cursor-pointer" onClick={handleToggleDetails}>
          <FaCheckCircle className="w-5 h-5 text-green-500 md:w-6 md:h-6" />
          <p className="ml-2 text-gray-600">Available today</p>
        </div>
        <p className="ml-8 font-bold text-gray-800">11:00 AM - 01:00 PM</p>
        {showDetails && (
          <motion.div
            className="mt-2 ml-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>Day: Tuesday</p>
            <p>Time: 11:00 AM - 01:00 PM</p>
            <p>Day: Wednesday</p>
            <p>Time: 11:00 AM - 01:00 PM</p>
            <p>Day: Thursday</p>
            <p>Time: 11:00 AM - 01:00 PM</p>
            <p>Day: Friday</p>
            <p>Time: 11:00 AM - 01:00 PM</p>
          </motion.div>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={handleOpenModal}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-900"
        >
          Book Appointment
        </button>
      </div>
      <div className="p-4 mt-4">
        <div className="flex mb-3">
          <FaCalendarCheck className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
          <p className="ml-2 text-gray-600">Book Appointment in 30 sec</p>
        </div>
        <div className="flex mb-3">
          <FaLock className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
          <p className="ml-2 text-gray-600">100% Secure</p>
        </div>
        <div className="flex ">
          <FaUserShield className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
          <p className="ml-2 text-gray-600">Priority Customer Support</p>
        </div>
      </div>

      {/* Include the Modal component here */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  </motion.div>
</div>


      {/* Product Update Section */}
      <motion.div
        className="mt-10 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full p-4 bg-white border-gray-300 md:ml-8 md:w-3/5 md:p-6">
  <h4 className="mb-4 text-xl font-bold text-black md:text-2xl lg:text-3xl dark:text-black">
    Prof. Dr. Muhammad Saleem Akhtar
  </h4>

  <hr className="mb-4 border-t border-gray-200" />

  {/* Skill Items */}
  {[
    { number: 1, skill: 'Doctor Checkup', color: 'bg-red-500', width: '80%', percentage: '80%' },
    { number: 2, skill: 'Clinic Environment', color: 'bg-purple-500', width: '95%', percentage: '95%' },
    { number: 3, skill: 'Staff Behaviour', color: 'bg-blue-500', width: '65%', percentage: '65%' },
    { number: 4, skill: 'Staff Behaviour', color: 'bg-pink-500', width: '85%', percentage: '85%' }
  ].map((item, index) => (
    <motion.div
      className="mb-4 text-black"
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.4 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <span className="w-full md:w-1/12 text-center text-base font-semibold text-gray-lite dark:text-[#A6A6A6]">
          {item.number}
        </span>
        <span className="w-full md:w-4/12 text-center md:text-left text-base text-gray-lite dark:text-[#A6A6A6]">
          {item.skill}
        </span>
        <div className="w-full md:w-4/12">
          <div className="flex w-full">
            <div className="flex-grow h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 ${item.color} rounded-full`}
                style={{ width: item.width }}
              ></div>
            </div>
          </div>
        </div>
        <span
          className={`text-base mt-2 md:mt-0 text-center md:text-right ml-0 md:ml-4 border border-gray-300 rounded px-2 py-1 ${item.color} text-white`}
        >
          {item.percentage}
        </span>
      </div>
      <hr className="mt-4 border-t border-gray-300" />
    </motion.div>
  ))}
</div>

      </motion.div>
      
     {/* Service */}
   
     <div className="w-full p-4 text-black border-black border-1 md:w-3/5 rounded-xl">
  <h2 className="m-4 ml-2 text-2xl font-bold md:text-4xl">Service List</h2>
  <ul className="flex flex-wrap ml-0 text-lg md:ml-12">
    <li className="w-full mb-3 md:w-1/2">Acute and Chronic Renal Failure</li>
    <li className="w-full mb-3 md:w-1/2">Acute Kidney Injury</li>
    <li className="w-full mb-3 md:w-1/2">Diabetes Management (ذیابیطس کا انتظام)</li>
    <li className="w-full mb-3 md:w-1/2">Haemodialysis</li>
    <li className="w-full mb-3 md:w-1/2">Hypertension</li>
    <li className="w-full mb-3 md:w-1/2">Acute Kidney Injury</li>
    {showMore && (
      <>
        <li className="w-full mb-3 md:w-1/2">Kidney Transplant</li>
        <li className="w-full mb-3 md:w-1/2">Nephrotic Syndrome</li>
        <li className="w-full mb-3 md:w-1/2">Peritoneal Dialysis</li>
      </>
    )}
  </ul>
  <button
    onClick={handleToggle}
    className="p-3 mt-4 ml-0 text-xl underline md:ml-12 hover:bg-green-500"
  >
    {showMore ? 'View Less...' : 'View More...'}
  </button>
</div>

 {/* Education */}

 <div className="w-full p-4 mt-4 text-black md:w-3/5 rounded-xl">
  <h1 className="m-4 ml-2 text-2xl font-bold md:text-4xl">Education
  </h1>
  <ul className="flex flex-wrap ml-0 text-lg md:ml-12">
    <li className="w-full mb-3 md:w-1/2">M.B.B.S - University of the Punjab</li>
    <li className="w-full mb-3 md:w-1/2">FRCP (Glasgow)</li>
    <li className="w-full mb-3 md:w-1/2">F.C.P.S (Nephrology) </li>
    <li className="w-full mb-3 md:w-1/2">MRCP (Glasgow)</li>
    <li className="w-full mb-3 md:w-1/2">M.R.C.P (UK) - Royal College of Physicians of UK</li>
    
  </ul>
 
</div>

{/* Experience */}
<div className="w-full p-4 mt-4 text-black border-black md:w-3/5 rounded-xl border-1">
  <h1 className="m-4 ml-2 text-2xl font-bold md:text-4xl">Experience
  </h1>
  <ul className="ml-0 text-lg md:ml-12">
    <li className="">Dr. Hameed Tajammal Khan has over 30 years of experience in his field.</li>
  </ul>
 
</div>

<div className="w-full p-4 mt-4 text-black md:w-3/5 rounded-xl ">
  <h1 className="m-4 ml-2 text-2xl font-bold md:text-4xl">Professional memberships
  </h1>
  <ul className="ml-0 text-lg md:ml-12">
    <li className="">Pakistna Medical and Dental Council (PMDC)</li>
  </ul>
 
</div>

{/* faq  */}
<section className="py-10 text-black sm:py-16 lg:py-24">
  <div className="px-4 mx-auto max-w-10xl sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Explore Common Questions
          </h2>
        </div>
        <div className="mt-8 space-y-4 md:mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-black">{faq.question}</span>
                {openIndex === index ? (
                  <IoIosArrowUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <IoIosArrowDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-base text-center text-gray-600 mt-9">
          Still have questions?
          <span className="font-medium transition-all duration-200 cursor-pointer text-tertiary hover:text-tertiary focus:text-tertiary hover-underline">
            Contact our support
          </span>
        </p>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Pd1;









