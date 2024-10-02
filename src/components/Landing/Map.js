import React from 'react';

const Map = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:flex-row md:p-16 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full p-4 md:w-1/2">
        <h2 className="mb-8 text-4xl font-extrabold text-center text-gray-800 md:text-6xl md:text-left">
          Get in Touch!
        </h2>
        <form className="p-8 space-y-6 shadow-2xl rounded-2xl">
          <div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-4 transition duration-300 ease-in-out border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 transition duration-300 ease-in-out border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              className="w-full p-4 transition duration-300 ease-in-out border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-colors duration-300 ease-in-out bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center w-full p-4 md:w-1/2">
          <div className="rounded-full overflow-hidden w-[35rem] h-[35rem]">
            <iframe
              className="w-[35rem] h-[35rem]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160407063!2d-74.25986568785095!3d40.697670063849574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzUxLjYiTiA3NMKwMTUnMzUuNyJX!5e0!3m2!1sen!2sus!4v1652901957916"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
    </div>
  );
};

export default Map;
