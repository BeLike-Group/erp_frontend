import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserMd, FaFlask, FaPrescriptionBottle, FaBed } from 'react-icons/fa';

const features = [
  { 
    icon: FaUserMd, 
    title: 'Doctor Panel', 
    description: 'Access a dedicated panel for doctors to manage patient appointments, medical records, and treatment plans efficiently.',
    buttons: [
      { text: 'Learn More', link: '/doctor-panel2' },
     
    ]
  },
  { 
    icon: FaFlask, 
    title: 'Labs', 
    description: 'State-of-the-art laboratory services offering a wide range of diagnostic tests to ensure accurate and timely results for patients.',
    buttons: [
      { text: 'Learn More', link: '/labs2' },
     
    ]
  },
  { 
    icon: FaPrescriptionBottle, 
    title: 'Pharmacy', 
    description: 'On-site pharmacy with a wide selection of medications, ensuring patients receive their prescriptions promptly and accurately.',
    buttons: [
      { text: 'Learn More', link: '/pharmacy2' },
      
    ]
  },
  { 
    icon: FaBed, 
    title: 'Patient Capacity', 
    description: 'A spacious facility with a large number of patient beds, ensuring adequate capacity to handle both outpatient and inpatient care needs.',
    buttons: [
      { text: 'Learn More', link: '/patient-capacity2' },
     
    ]
  },
];

const Card2 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-800 lg:py-16 lg:px-6">
      <div className="mb-10 text-center">
        <h2 className="pt-16 -mb-16 text-2xl font-bold tracking-tight sm:mb-10 sm:text-6xl text-primary-800">Hospital Features</h2>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Hospital Image */}
        <div className="pl-32 mt-16 mb-6 md:mb-0 md:mr-8">
          <img className="w-1/2 mx-auto sm:h-[80%] h-[60%] sm:pr-0 pr-24 rounded-xl md:w-full" src="http://localhost:3000/static/media/hospital10.295338121a34cba0bd77.png" alt="Hospital" />
        </div>
        {/* End Hospital Image */}

        <div className="flex flex-col flex-wrap flex-1 pl-5 pr-5 -mx-2 -mb-4 sm:pl-0 sm:pr-32 sm:flex-row">
          {/* Card Component */}
          {features.map((feature, index) => (
            <div key={index} className="w-full px-2 mb-4 sm:w-1/2">
              <div className="relative h-full px-6 py-4 transition-transform transform border border-t-0 border-l-0 border-green-500 rounded-br-xl hover:scale-105">
                <h1 className="flex items-center mb-6 text-4xl font-bold">
                  <feature.icon className="mr-2 text-green-500" /> {feature.title}
                </h1>
                <p className="mb-4 text-sm">{feature.description}</p>
                <div className="flex flex-col space-y-2">
                  {feature.buttons.map((button, btnIndex) => (
                    <NavLink key={btnIndex} to={button.link}>
                      <button className="px-8 py-2 ml-40 text-lg font-semibold text-white transition-all shadow-2xl sm:ml-32 rounded-xl bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                        {button.text}
                      </button>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* End Card Component */}
        </div>
      </div>
    </div>
  );
};

export default Card2;
