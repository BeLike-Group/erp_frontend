import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6" id="contactus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between">
        {/* Logo and Menu */}
        <div className="flex flex-row mb-4 sm:mb-0">
          <div className="mb-4 sm:mb-0 mt-16">
            <img
              className="h-20 mx-12"
              src="https://www.belikegroup.org/static/media/logo.3a3cb8d082342adf9151.png"
              alt="Logo"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mx-12 py-0 hover:text-blue-900 mt-2 cursor-pointer">
              Menu
            </h1>
            <div className="space-y-3 mx-12 mt-4">
              <a href="/" className="block text-white text-[0.90rem]">
                Home
              </a>
              <a href="/" className="block text-white text-[0.90rem]">
                Service
              </a>
              <a href="/" className="block text-white text-[0.90rem]">
                Projects
              </a>
              <a href="/" className="block text-white text-[0.90rem]">
                Contact Us
              </a>
              <a href="/" className="block text-white text-[0.90rem]">
                About Us
              </a>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col space-y-4 mt-6 sm:mt-0">
          <div className="flex items-center">
            <FaPhone className="text-green-500 mr-2" size={20} />
            <span className="text-[0.95rem]">+92 347 5800705</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-green-500 mr-2" size={20} />
            <span className="text-[0.95rem]"> +92 300 6900769</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-blue-400 mr-2" size={20} />
            <span className="text-[0.95rem]">beligroup35@gmail.com</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" size={20} />
            <span className="text-[0.95rem]">
            21 1C1 College Road Township Near Lajna Chowk Dhaka Bhaya Baryani Lahore              </span>
          </div>
        </div>

        {/* Join Section */}
        <div>
          {/*  */}
          {/* Social Media Icons */}
          <div className="flex justify-center mt-4">
            <a href="https://facebook.com" className="mx-2">
              <FaFacebook size={24} className="text-blue-400" />
            </a>
            <a href="https://twitter.com" className="mx-2">
              <FaTwitter size={24} className="text-blue-400" />
            </a>
            <a href="https://instagram.com" className="mx-2">
              <FaInstagram size={24} className="text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 bg-blue-300 m-2">
        <button>
          <a href="/">
            <p className="text-blue-950 font-semibold text-sm hover:text-blue-50">
              © 2024 Belike Group. All rights reserved.
            </p>
          </a>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
