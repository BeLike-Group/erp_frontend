import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserMd, FaFlask, FaPrescriptionBottle, FaBed } from 'react-icons/fa';
import Feedback from '../Feedback'
import Map from '../../../../components/Landing/Map';
import Video from './Vedio';
import Ex from './Ex.js';
import FAQ from './FAQ.js';

const Ecommerce = () => {
  return (
    <div>
      <div className="text-black bg-white shadow-2xl lg:py-16 lg:px-6">
        <div className="mb-10 text-center">
          <h2 className="pt-16 -mb-16 text-2xl font-bold tracking-tight sm:mb-10 sm:text-6xl text-primary-800">Hospital Features</h2>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="pl-32 mt-16 mb-6 md:mb-0 md:mr-8">
            <img className="w-1/2 mx-auto sm:h-[80%] h-[60%] sm:pr-0 pr-24 rounded-xl md:w-full" src="http://localhost:3000/static/media/hospital1.f3c5641cb6eae3778723.png" alt="Hospital" />
          </div>

          <div className="flex flex-col flex-wrap flex-1 pl-5 pr-5 -mx-2 -mb-4 sm:pl-0 sm:pr-32 sm:flex-row">
            <div className="w-full px-2 mb-4 sm:w-1/2">
              <div className="relative h-full px-6 py-8 transition-transform transform border border-t-0 border-l-0 shadow-xl rounded-br-xl hover:scale-105 hover:shadow-2xl">
                <h1 className="flex items-center mb-6 text-4xl font-bold">
                  <FaUserMd className="mr-2 text-green-500" /> Doctor Panel
                </h1>
                <p className="mb-4 text-sm">Access a dedicated panel for doctors to manage patient appointments, medical records, and treatment plans efficiently.</p>
                <div className="flex flex-col space-y-2">
                <NavLink to="/doctor-panel">
                <button className="px-8 py-2 ml-40 text-lg font-semibold text-black transition-all bg-green-500 shadow-xl hover:text-white sm:ml-32 rounded-xl ">
                Learn_More
                    </button>
                    <b/>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="w-full px-2 mb-4 sm:w-1/2">
              <div className="relative h-full px-6 py-8 transition-transform transform border border-t-0 border-l-0 shadow-xl rounded-br-xl hover:scale-105 hover:shadow-2xl">
                <h1 className="flex items-center mb-6 text-4xl font-bold">
                  <FaFlask className="mr-2 text-green-500" /> Labs
                </h1>
                <p className="mb-4 text-sm">State-of-the-art laboratory services offering a wide range of diagnostic tests to ensure accurate and timely results for patients.</p>
                <div className="flex flex-col space-y-2">
                <NavLink to="/patient-capacity">
                    <button className="px-8 py-2 ml-40 text-lg font-semibold text-black transition-all bg-green-500 shadow-xl hover:text-white sm:ml-32 rounded-xl ">
                      Learn_More
                    </button>
                    <b/>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="w-full px-2 mb-4 sm:w-1/2">
              <div className="relative h-full px-6 py-8 transition-transform transform border border-t-0 border-l-0 shadow-xl rounded-br-xl hover:scale-105 hover:shadow-2xl">
                <h1 className="flex items-center mb-6 text-4xl font-bold">
                  <FaPrescriptionBottle className="mr-2 text-green-500" /> Pharmacy
                </h1>
                <p className="mb-4 text-sm">On-site pharmacy with a wide selection of medications, ensuring patients receive their prescriptions promptly and accurately.</p>
                <div className="flex flex-col space-y-2">
                <NavLink to="/patient-capacity">
                <button className="px-8 py-2 ml-40 text-lg font-semibold text-black transition-all bg-green-500 shadow-xl hover:text-white sm:ml-32 rounded-xl ">
                Learn_More
                    </button>
                    <b/>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="w-full px-2 mb-4 sm:w-1/2">
              <div className="relative h-full px-6 py-8 transition-transform transform border border-t-0 border-l-0 shadow-xl rounded-br-xl hover:scale-105 hover:shadow-2xl">
                <h1 className="flex items-center mb-6 text-4xl font-bold">
                  <FaBed className="mr-2 text-green-500" /> Patient Capacity
                </h1>
                <p className="mb-4 text-sm">A spacious facility with a large number of patient beds, ensuring adequate capacity to handle both outpatient and inpatient care needs.</p>
                <div className="flex flex-col space-y-2">
                  <NavLink to="/patient-capacity">
                  <button className="px-8 py-2 ml-40 text-lg font-semibold text-black transition-all bg-green-500 shadow-xl hover:text-white sm:ml-32 rounded-xl ">
                  Learn_More
                    </button>
                 
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 mt-5 mb-5 text-center bg-gradient-to-r from-green-400 to-green-600">
  <h2 className="text-3xl font-bold text-white">Book Your Appointment Today!</h2>
 <NavLink to={'/doctor-panel'}>
  <button className="px-6 py-3 mt-4 font-bold text-green-600 transition-all bg-white rounded-lg hover:bg-gray-100">
    Book Now
  </button>
  </NavLink>
</div>


        <Feedback />
        <Ex/>
      <FAQ/>
        
      </div>
      <Video />
      <Map />

      {/* WhatsApp Button */}
      <div className="whatsapp-btn">
        <div className="style4 animated no-animation ccw-no-hover-an">
          <a
            className="nofocus"
            href="https://api.whatsapp.com/send?phone=+923475800705&text=Hi, I’m reaching out through Belike!"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <div
              className="chip style-4 ccw-analytics"
              data-ccw="style-4"
              id="style-4"
              style={{
                backgroundColor: "#25D366",
                borderRadius: "100%",
                color: "white !important",
                fontSize: "20px",
                padding: "18px 20px 15px 20px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              <i
                aria-hidden="true"
                className="fa fa-whatsapp"
                style={{
                  fontSize: "36px",
                }}
              />
            </div>
          </a>
        </div>
      </div>

      {/* WhatsApp Button CSS */}
      <style>
        {`
          .whatsapp-btn {
            position: fixed;
            bottom: 40px;
            right: 30px;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  );
};

export default Ecommerce;
