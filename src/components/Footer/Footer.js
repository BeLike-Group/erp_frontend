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
            <FaEnvelope className="text-blue-400 mr-2" size={20} />
            <span className="text-[0.95rem]">beligroup35@gmail.com</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" size={20} />
            <span className="text-[0.95rem]">
            21 1c1 college road township near lajna chowk Dhaka bhaya baryani Lahore            </span>
          </div>
        </div>

        {/* Join Section */}
        <div>
          <div className="flex flex-col items-center sm:flex-row sm:items-center ml-4">
            <div className="text-center text-white bg-bg-inherit m-2 rounded-xl pr-12 border-2 bg-gray-900 p-3 border-gray-900">
              <h1 className="text-1xl font-bold">JOIN OUR INVESTOR TODAY</h1>
              <p className="mt-2 text-[0.95rem] tracking-wide">
                Belike Group services involve SEO, social media PPC
                <br />
                advertising content marketing, and email
                <br />
                campaigns and email campaigns..
              </p>
              <button className="bg-green-500 px-4 py-2 rounded-md mt-4 hover:bg-green-300">
                <a href="/">
                  <p className="text-blue-900 font-semibold">Join Now</p>
                </a>
              </button>
            </div>
          </div>
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
