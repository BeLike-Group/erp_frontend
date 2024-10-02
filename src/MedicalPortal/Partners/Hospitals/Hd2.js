import React, { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import e1 from "../../../Assets/Welfares/welfare/gynecologist.png";
import e2 from "../../../Assets/Welfares/welfare/gynecologist.png";
import e3 from "../../../Assets/Welfares/welfare/orthopedic-surgeon.png";
import e4 from "../../../Assets/Welfares/welfare/urologist.png";
import e5 from "../../../Assets/Welfares/welfare/general-surgeon.png";
import e6 from "../../../Assets/Welfares/welfare/gynecologist.png";
import e7 from "../../../Assets/Welfares/welfare/urologist.png";
import e8 from "../../../Assets/Welfares/welfare/general-surgeon.png";
import e9 from "../../../Assets/Welfares/welfare/general-physician.png";
import e10 from "../../../Assets/Welfares/welfare/general-physician.png";
import e11 from "../../../Assets/Welfares/welfare/kidney-specialist.png";
import e12 from "../../../Assets/Welfares/welfare/general-physician.png";
import Doctorhd1 from './Doctorhd1';
import { NavLink } from 'react-router-dom';

const items = [
  { id: 1, title: "Gynecologist", image: e1, link: "/doctor's-panel" },
  { id: 2, title: "Obstetrician", image: e2, link: "/doctor's-panel" },
  { id: 3, title: "Orthopedic Surgeon", image: e3, link: "/doctor's-panel" },
  { id: 4, title: "Urologist", image: e4, link: "/doctor's-panel" },
  { id: 5, title: "General Surgeon", image: e5, link: "/doctor's-panel" },
  { id: 6, title: "Fertility Consultant", image: e6, link: "/doctor's-panel" },
  { id: 7, title: "Andrologist", image: e7, link: "/doctor's-panel" },
  { id: 8, title: "Kidney Transplant Surgeon", image: e8, link: "/doctor's-panel" },
  { id: 9, title: "Internal Medicine Specialist", image: e9, link: "/doctor's-panel" },
  { id: 10, title: "General Physician", image: e10, link: "/doctor's-panel" },
  { id: 11, title: "Nephrologist", image: e11, link: "/doctor's-panel" },
  { id: 12, title: "Family Physician", image: e12, link: "" },
  { id: 13, title: "Pediatrician", image: e1, link: "/doctor's-panel" },
  { id: 14, title: "Cardiologist", image: e2, link: "/doctor's-panel" },
  { id: 15, title: "Neurologist", image: e3, link: "/doctor's-panel" },
  { id: 16, title: "Dermatologist", image: e4, link: "/doctor's-panel" },
  { id: 17, title: "Psychiatrist", image: e5, link: "/doctor's-panel" },
  { id: 18, title: "Oncologist", image: e6, link: "/doctor's-panel" },
  { id: 19, title: "Endocrinologist", image: e7, link: "/doctor's-panel" },
  { id: 20, title: "Rheumatologist", image: e8, link: "/doctor's-panel" },
  { id: 21, title: "Pulmonologist", image: e9, link: "/doctor's-panel" },
  { id: 22, title: "Gastroenterologist", image: e10, link: "/doctor's-panel" },
  { id: 23, title: "Hematologist", image: e11, link: "/doctor's-panel" },
  { id: 24, title: "Ophthalmologist", image: e12, link: "/doctor's-panel" },
];

const Hd2 = () => {
  const [visibleCount, setVisibleCount] = useState(12);

  const showMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  const showLess = () => {
    setVisibleCount(12);
  };

  return (
    <div>
      {/* Original HD Container */}
      <div className="w-full px-4 pt-4 pb-8 bg-white md:px-16">
        <div className="p-5 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img 
                src="http://localhost:3000/static/media/hospital10.295338121a34cba0bd77.png"
                alt="Hospital Logo" 
                className="w-24 h-24 mb-4 border-2 border-blue-500 rounded-full md:w-32 md:h-32 md:mb-0"
              />
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:ml-8 md:text-left">
              <h1 className="text-2xl font-semibold text-black">Ali Hospital</h1>
              <p className="mt-2 text-lg text-black">Ali Town, Lahore</p>
              <div className="flex flex-col gap-4 mt-4 md:flex-row">
                <a 
                  href="tel:+923045678910" 
                  className="flex items-center justify-center w-full px-8 py-3 font-semibold text-white transition duration-200 ease-in-out bg-blue-800 rounded-lg md:w-auto hover:bg-blue-700"
                >
                  <FaPhoneAlt className="mr-2" /> Call Helpline
                </a>
                <a 
                  href="https://maps.google.com/?q=31.473951,74.241249"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-8 py-3 bg-white border-2 border-black rounded-lg md:w-auto"
                >
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Container */}
      <div className="w-full px-4 bg-white md:px-16">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-2xl text-center text-black font-lg md:text-left">Find Doctor by Speciality</h1>
          <div className="flex flex-wrap -mx-2">
            {items.slice(0, visibleCount).map(item => (
              <div key={item.id} className="flex flex-col items-center w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/6">
                {item.link ? (
                  <NavLink to={item.link}>
                  {/* <a href={item.link} className="flex flex-col items-center text-center transition-transform transform hover:scale-110"> */}
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-20 h-20 mb-4 transition-transform transform border border-gray-300 rounded-full hover:scale-110"
                    />
                    <h3 className="text-lg text-black font-md">{item.title}</h3>
                  {/* </a> */}
                  </NavLink>
                ) : (
                  <>
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-20 h-20 mb-4 transition-transform transform border border-gray-300 rounded-full hover:scale-110"
                    />
                    <h3 className="text-lg text-center text-black font-md">{item.title}</h3>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {visibleCount < items.length && (
              <button 
                onClick={showMore}
                className="flex items-center py-3 text-black bg-gray-300 rounded-lg px-52 hover:bg-blue-700"
              >
                <FaChevronDown className="mr-2" />
                Show More
              </button>
            )}
            {visibleCount > 12 && (
              <button 
                onClick={showLess}
                className="flex items-center py-3 text-black bg-gray-300 rounded-lg px-96 hover:bg-blue-700"
              >
                <FaChevronUp className="mr-2" />
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
      <Doctorhd1 />
    </div>
  );
};

export default Hd2;
