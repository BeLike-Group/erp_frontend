// import React, { useState } from "react";
// import {
//   FaHeartbeat,
//   FaProcedures,
//   FaHospitalAlt,
//   FaStethoscope,
//   FaUserMd,
//   FaLungs,
//   FaBrain,
//   FaVirus,
//   FaCapsules,
//   FaCogs,
// } from "react-icons/fa";
// import { AiFillCaretRight } from "react-icons/ai";

// const Ward = () => {
//   const [selectedWard, setSelectedWard] = useState(null);

  // const wards = [
  //   {
  //     name: "Intensive Care Unit (ICU)",
  //     description:
  //       "Our ICU is equipped with advanced medical technology to monitor and treat critically ill patients. It offers around-the-clock care with a focus on stabilizing and improving patient health.",
  //     icon: <FaProcedures className="text-6xl text-blue-700" />,
  //     relatedWards: [
  //       {
  //         name: "Cardiology",
  //         description: [
  //           "Specializes in diagnosing and treating heart conditions.",
  //           "Provides comprehensive care for various heart diseases.",
  //           "Offers advanced diagnostic and therapeutic procedures.",
  //         ],
  //         icon: <FaHeartbeat className="text-5xl text-red-600" />,
  //       },
        
  //       {
  //         name: "Pulmonology",
  //         description: [
  //           "Focuses on managing respiratory disorders.",
  //           "Includes treatment for chronic obstructive pulmonary disease (COPD) and asthma.",
  //           "Utilizes cutting-edge technology for respiratory care.",
  //         ],
  //         icon: <FaLungs className="text-5xl text-cyan-600" />,
  //       },
  //       // Add 6 more related wards
  //       {
  //         name: "Gastroenterology",
  //         description: [
  //           "Addresses issues related to the digestive system.",
  //           "Provides care for conditions such as IBS, liver disease, and gastrointestinal disorders.",
  //           "Uses advanced diagnostic and treatment methods.",
  //         ],
  //         icon: <FaCapsules className="text-5xl text-yellow-600" />,
  //       },
  //       {
  //         name: "Nephrology",
  //         description: [
  //           "Focuses on kidney care including the treatment of chronic kidney disease, kidney stones, and dialysis.",
  //           "Provides comprehensive management for all types of kidney-related conditions.",
  //           "Specializes in various kidney disorders.",
  //         ],
  //         icon: <FaCogs className="text-5xl text-green-600" />,
  //       },
  //       {
  //         name: "Oncology",
  //         description: [
  //           "Dedicated to the treatment of cancer.",
  //           "Offers a range of services from diagnosis to therapy, including chemotherapy and radiation.",
  //           "Provides supportive care to address the needs of cancer patients.",
  //         ],
  //         icon: <FaCapsules className="text-5xl text-pink-600" />,
  //       },
  //       {
  //         name: "Infectious Disease",
  //         description: [
  //           "Dedicated to diagnosing, treating, and managing infectious diseases.",
  //           "Uses the latest medical practices to control and prevent the spread of infections.",
  //           "Includes care for various types of infections and diseases.",
  //         ],
  //         icon: <FaVirus className="text-5xl text-orange-600" />,
  //       },
  //       {
  //         name: "Neurology",
  //         description: [
  //           "Specializes in neurological conditions such as strokes, epilepsy, and Parkinson’s disease.",
  //           "Provides comprehensive care for complex neurological disorders.",
  //           "Offers diagnostic and therapeutic services.",
  //         ],
  //         icon: <FaBrain className="text-5xl text-teal-600" />,
  //       },
  //       {
  //         name: "Vascular Surgery",
  //         description: [
  //           "Focuses on the treatment of blood vessel disorders.",
  //           "Includes surgeries for aneurysms and varicose veins.",
  //           "Offers minimally invasive procedures.",
  //         ],
  //         icon: <FaCogs className="text-5xl text-green-600" />,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Cardiac Care Unit (CCU)",
  //     description:
  //       "The CCU provides specialized care for patients with severe cardiac conditions. Our team of cardiologists and nurses are dedicated to managing and treating heart-related ailments with state-of-the-art equipment.",
  //     icon: <FaHeartbeat className="text-6xl text-red-700" />,
  //     relatedWards: [
  //       {
  //         name: "Cardiology",
  //         description: [
  //           "Specializes in diagnosing and treating heart conditions.",
  //           "Provides comprehensive care for various heart diseases.",
  //           "Offers advanced diagnostic and therapeutic procedures.",
  //         ],
  //         icon: <FaHeartbeat className="text-5xl text-red-600" />,
  //       },
  //       {
  //         name: "Vascular Surgery",
  //         description: [
  //           "Focuses on the treatment of blood vessel disorders.",
  //           "Includes surgeries for aneurysms and varicose veins.",
  //           "Offers minimally invasive procedures.",
  //         ],
  //         icon: <FaCogs className="text-5xl text-green-600" />,
  //       },
  //       // Add 6 more related wards
  //       {
  //         name: "Electrophysiology",
  //         description: [
  //           "Focuses on the diagnosis and treatment of heart rhythm disorders.",
  //           "Uses advanced techniques such as ablation and pacemaker implantation.",
  //           "Provides comprehensive management of arrhythmias.",
  //         ],
  //         icon: <FaCogs className="text-5xl text-blue-600" />,
  //       },
  //       {
  //         name: "Heart Failure",
  //         description: [
  //           "Specializes in the management of chronic heart failure.",
  //           "Offers treatments including medications, lifestyle changes, and device therapy.",
  //           "Provides support for advanced heart failure conditions.",
  //         ],
  //         icon: <FaHeartbeat className="text-5xl text-red-600" />,
  //       },
  //       {
  //         name: "Interventional Cardiology",
  //         description: [
  //           "Focuses on catheter-based treatments for heart disease.",
  //           "Includes angioplasty, stent placement, and other procedures.",
  //           "Aims to improve blood flow and heart function.",
  //         ],
  //         icon: <FaCogs className="text-5xl text-purple-600" />,
  //       },
  //       {
  //         name: "Preventive Cardiology",
  //         description: [
  //           "Specializes in preventing cardiovascular diseases.",
  //           "Includes risk assessment, lifestyle counseling, and preventive therapies.",
  //           "Focuses on reducing the incidence of heart disease.",
  //         ],
  //         icon: <FaHeartbeat className="text-5xl text-orange-600" />,
  //       },
  //       {
  //         name: "Pediatric Cardiology",
  //         description: [
  //           "Provides cardiac care for infants, children, and adolescents.",
  //           "Includes diagnosis and treatment of congenital and acquired heart conditions.",
  //           "Offers specialized care for young patients.",
  //         ],
  //         icon: <FaHeartbeat className="text-5xl text-pink-600" />,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Medical Ward",
  //     description:
  //       "The Medical Ward offers comprehensive care for patients requiring hospitalization for a variety of medical conditions. Our team ensures a thorough and personalized approach to each patient's care plan.",
  //     icon: <FaHospitalAlt className="text-6xl text-green-700" />,
  //     relatedWards: [
  //       {
  //         name: "General Medicine",
  //         description: [
  //           "Provides care for a broad range of medical conditions.",
  //           "Includes infections, chronic illnesses, and preventive care.",
  //           "Doctors work to diagnose and manage these conditions effectively.",
  //         ],
  //         icon: <FaStethoscope className="text-5xl text-blue-600" />,
  //       },
  //       {
  //         name: "Geriatric Care",
  //         description: [
  //           "Focuses on the health and well-being of elderly patients.",
  //           "Provides specialized treatments for age-related conditions.",
  //           "Aims to ensure a higher quality of life for senior patients.",
  //         ],
  //         icon: <FaUserMd className="text-5xl text-purple-600" />,
  //       },
  //       {
  //         name: "Infectious Disease",
  //         description: [
  //           "Dedicated to diagnosing, treating, and managing infectious diseases.",
  //           "Uses the latest medical practices to control and prevent the spread of infections.",
  //           "Includes care for various types of infections and diseases.",
  //         ],
  //         icon: <FaVirus className="text-5xl text-orange-600" />,
  //       },
  //       {
  //         name: "Neurology",
  //         description: [
  //           "Specializes in neurological conditions such as strokes, epilepsy, and Parkinson’s disease.",
  //           "Provides comprehensive care for complex neurological disorders.",
  //           "Offers diagnostic and therapeutic services.",
  //         ],
  //         icon: <FaBrain className="text-5xl text-teal-600" />,
  //       },
  //       {
  //         name: "Pulmonology",
  //         description: [
  //           "Focuses on respiratory conditions including asthma, COPD, and lung infections.",
  //           "Uses advanced techniques to manage and treat pulmonary diseases.",
  //           "Provides care for a variety of respiratory issues.",
  //         ],
  //         icon: <FaLungs className="text-5xl text-cyan-600" />,
  //       },
  //       {
  //         name: "Gastroenterology",
  //         description: [
  //           "Addresses issues related to the digestive system.",
  //           "Provides care for conditions such as IBS, liver disease, and gastrointestinal disorders.",
  //           "Uses advanced diagnostic and treatment methods.",
  //         ],
  //         icon: <FaCapsules className="text-5xl text-yellow-600" />,
  //       },
  //       {
  //         name: "Oncology",
  //         description: [
  //           "Dedicated to the treatment of cancer.",
  //           "Offers a range of services from diagnosis to therapy, including chemotherapy and radiation.",
  //           "Provides supportive care to address the needs of cancer patients.",
  //         ],
  //         icon: <FaCapsules className="text-5xl text-pink-600" />,
  //       },
  //     ],
  //   },
  // ];

//   const handleCardClick = (ward) => {
//     setSelectedWard(selectedWard === ward.name ? null : ward.name);
//   };

//   return (
//     <div className="py-16 text-black bg-gray-50">
//       <div className="text-center">
//         <h1 className="mb-12 text-6xl font-bold text-primary-800">
//           Our Medical Wards
//         </h1>
//       </div>
//       <div className="flex flex-wrap justify-center gap-8">
//         {wards.map((ward, index) => (
//           <div
//             key={index}
//             className="w-full max-w-xs transition-transform duration-300 transform hover:scale-105 bg-white rounded-lg shadow-lg cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 hover:bg-blue-800 hover:shadow-2xl"
//             onClick={() => handleCardClick(ward)}
//           >
//             <div className="flex flex-col items-center p-6 h-auto">
//               <div className="mb-4">{ward.icon}</div>
//               <h1 className="text-2xl font-bold text-center text-black">
//                 {ward.name}
//               </h1>
//               <p className="mt-4 text-center text-gray-600">
//                 {ward.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedWard && (
//         <div className="mt-12">
//           <h3 className="text-3xl font-bold text-center text-primary-800">
//             Related Wards for {selectedWard}
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 mt-8">
//             {wards
//               .find((ward) => ward.name === selectedWard)
//               ?.relatedWards?.map((relatedWard, index) => (
//                 <div
//                   key={index}
//                   className="w-full max-w-xs transition-transform duration-300 transform hover:scale-105 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4 hover:bg-blue-800 hover:shadow-2xl"
//                 >
//                   <div className="flex flex-col items-center p-6 h-auto">
//                     <div className="mb-4">{relatedWard.icon}</div>
//                     <h1 className="text-2xl font-bold text-center text-gray-800">
//                       {relatedWard.name}
//                     </h1>
//                     <div className="mt-4 text-gray-600">
//                       {relatedWard.description.map((desc, i) => (
//                         <div key={i} className="flex items-center mb-2">
//                           <AiFillCaretRight className="text-green-500 text-2xl font-bold mr-2" />
//                           <span>{desc}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ward;



import React, { useState } from "react";
import {
  FaProcedures,
  FaHeartbeat,
  FaHospitalAlt,
  FaStethoscope,
  FaUserMd,
  FaLungs,
  FaBrain,
  FaVirus,
  FaCapsules,
  FaCogs,
} from "react-icons/fa";
import { AiFillCaretRight } from "react-icons/ai";
import Modal from "./Modal"; // Import the Modal component

const Ward = () => {
  const [selectedWard, setSelectedWard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wardForModal, setWardForModal] = useState(null);

  const wards = [
    {
      name: "Intensive Care Unit (ICU)",
      description:
        "Our ICU is equipped with advanced medical technology to monitor and treat critically ill patients. It offers around-the-clock care with a focus on stabilizing and improving patient health.",
      icon: <FaProcedures className="text-6xl text-blue-700" />,
      relatedWards: [
        {
          name: "Cardiology",
          description: [
            "Specializes in diagnosing and treating heart conditions.",
            "Provides comprehensive care for various heart diseases.",
            "Offers advanced diagnostic and therapeutic procedures.",
          ],
          icon: <FaHeartbeat className="text-5xl text-red-600" />,
        },
        
        {
          name: "Pulmonology",
          description: [
            "Focuses on managing respiratory disorders.",
            "Includes treatment for chronic obstructive pulmonary disease (COPD) and asthma.",
            "Utilizes cutting-edge technology for respiratory care.",
          ],
          icon: <FaLungs className="text-5xl text-cyan-600" />,
        },
        // Add 6 more related wards
        {
          name: "Gastroenterology",
          description: [
            "Addresses issues related to the digestive system.",
            "Provides care for conditions such as IBS, liver disease, and gastrointestinal disorders.",
            "Uses advanced diagnostic and treatment methods.",
          ],
          icon: <FaCapsules className="text-5xl text-yellow-600" />,
        },
        {
          name: "Nephrology",
          description: [
            "Focuses on kidney care including the treatment of chronic kidney disease, kidney stones, and dialysis.",
            "Provides comprehensive management for all types of kidney-related conditions.",
            "Specializes in various kidney disorders.",
          ],
          icon: <FaCogs className="text-5xl text-green-600" />,
        },
        {
          name: "Oncology",
          description: [
            "Dedicated to the treatment of cancer.",
            "Offers a range of services from diagnosis to therapy, including chemotherapy and radiation.",
            "Provides supportive care to address the needs of cancer patients.",
          ],
          icon: <FaCapsules className="text-5xl text-pink-600" />,
        },
        {
          name: "Infectious Disease",
          description: [
            "Dedicated to diagnosing, treating, and managing infectious diseases.",
            "Uses the latest medical practices to control and prevent the spread of infections.",
            "Includes care for various types of infections and diseases.",
          ],
          icon: <FaVirus className="text-5xl text-orange-600" />,
        },
        {
          name: "Neurology",
          description: [
            "Specializes in neurological conditions such as strokes, epilepsy, and Parkinson’s disease.",
            "Provides comprehensive care for complex neurological disorders.",
            "Offers diagnostic and therapeutic services.",
          ],
          icon: <FaBrain className="text-5xl text-teal-600" />,
        },
        {
          name: "Vascular Surgery",
          description: [
            "Focuses on the treatment of blood vessel disorders.",
            "Includes surgeries for aneurysms and varicose veins.",
            "Offers minimally invasive procedures.",
          ],
          icon: <FaCogs className="text-5xl text-green-600" />,
        },
      ],
    },
    {
      name: "Cardiac Care Unit (CCU)",
      description:
        "The CCU provides specialized care for patients with severe cardiac conditions. Our team of cardiologists and nurses are dedicated to managing and treating heart-related ailments with state-of-the-art equipment.",
      icon: <FaHeartbeat className="text-6xl text-red-700" />,
      relatedWards: [
        {
          name: "Cardiology",
          description: [
            "Specializes in diagnosing and treating heart conditions.",
            "Provides comprehensive care for various heart diseases.",
            "Offers advanced diagnostic and therapeutic procedures.",
          ],
          icon: <FaHeartbeat className="text-5xl text-red-600" />,
        },
        {
          name: "Vascular Surgery",
          description: [
            "Focuses on the treatment of blood vessel disorders.",
            "Includes surgeries for aneurysms and varicose veins.",
            "Offers minimally invasive procedures.",
          ],
          icon: <FaCogs className="text-5xl text-green-600" />,
        },
        // Add 6 more related wards
        {
          name: "Electrophysiology",
          description: [
            "Focuses on the diagnosis and treatment of heart rhythm disorders.",
            "Uses advanced techniques such as ablation and pacemaker implantation.",
            "Provides comprehensive management of arrhythmias.",
          ],
          icon: <FaCogs className="text-5xl text-blue-600" />,
        },
        {
          name: "Heart Failure",
          description: [
            "Specializes in the management of chronic heart failure.",
            "Offers treatments including medications, lifestyle changes, and device therapy.",
            "Provides support for advanced heart failure conditions.",
          ],
          icon: <FaHeartbeat className="text-5xl text-red-600" />,
        },
        {
          name: "Interventional Cardiology",
          description: [
            "Focuses on catheter-based treatments for heart disease.",
            "Includes angioplasty, stent placement, and other procedures.",
            "Aims to improve blood flow and heart function.",
          ],
          icon: <FaCogs className="text-5xl text-purple-600" />,
        },
        {
          name: "Preventive Cardiology",
          description: [
            "Specializes in preventing cardiovascular diseases.",
            "Includes risk assessment, lifestyle counseling, and preventive therapies.",
            "Focuses on reducing the incidence of heart disease.",
          ],
          icon: <FaHeartbeat className="text-5xl text-orange-600" />,
        },
        {
          name: "Pediatric Cardiology",
          description: [
            "Provides cardiac care for infants, children, and adolescents.",
            "Includes diagnosis and treatment of congenital and acquired heart conditions.",
            "Offers specialized care for young patients.",
          ],
          icon: <FaHeartbeat className="text-5xl text-pink-600" />,
        },
      ],
    },
    {
      name: "Medical Ward",
      description:
        "The Medical Ward offers comprehensive care for patients requiring hospitalization for a variety of medical conditions. Our team ensures a thorough and personalized approach to each patient's care plan.",
      icon: <FaHospitalAlt className="text-6xl text-green-700" />,
      relatedWards: [
        {
          name: "General Medicine",
          description: [
            "Provides care for a broad range of medical conditions.",
            "Includes infections, chronic illnesses, and preventive care.",
            "Doctors work to diagnose and manage these conditions effectively.",
          ],
          icon: <FaStethoscope className="text-5xl text-blue-600" />,
        },
        {
          name: "Geriatric Care",
          description: [
            "Focuses on the health and well-being of elderly patients.",
            "Provides specialized treatments for age-related conditions.",
            "Aims to ensure a higher quality of life for senior patients.",
          ],
          icon: <FaUserMd className="text-5xl text-purple-600" />,
        },
        {
          name: "Infectious Disease",
          description: [
            "Dedicated to diagnosing, treating, and managing infectious diseases.",
            "Uses the latest medical practices to control and prevent the spread of infections.",
            "Includes care for various types of infections and diseases.",
          ],
          icon: <FaVirus className="text-5xl text-orange-600" />,
        },
        {
          name: "Neurology",
          description: [
            "Specializes in neurological conditions such as strokes, epilepsy, and Parkinson’s disease.",
            "Provides comprehensive care for complex neurological disorders.",
            "Offers diagnostic and therapeutic services.",
          ],
          icon: <FaBrain className="text-5xl text-teal-600" />,
        },
        {
          name: "Pulmonology",
          description: [
            "Focuses on respiratory conditions including asthma, COPD, and lung infections.",
            "Uses advanced techniques to manage and treat pulmonary diseases.",
            "Provides care for a variety of respiratory issues.",
          ],
          icon: <FaLungs className="text-5xl text-cyan-600" />,
        },
        {
          name: "Gastroenterology",
          description: [
            "Addresses issues related to the digestive system.",
            "Provides care for conditions such as IBS, liver disease, and gastrointestinal disorders.",
            "Uses advanced diagnostic and treatment methods.",
          ],
          icon: <FaCapsules className="text-5xl text-yellow-600" />,
        },
        {
          name: "Oncology",
          description: [
            "Dedicated to the treatment of cancer.",
            "Offers a range of services from diagnosis to therapy, including chemotherapy and radiation.",
            "Provides supportive care to address the needs of cancer patients.",
          ],
          icon: <FaCapsules className="text-5xl text-pink-600" />,
        },
      ],
    },
  ];

  const handleCardClick = (ward) => {
    setSelectedWard(selectedWard === ward.name ? null : ward.name);
  };

  const handleRelatedWardClick = (ward) => {
    setWardForModal(ward);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWardForModal(null);
  };

  return (
    <div className="py-16 text-black bg-gray-50">
      <div className="text-center">
        <h1 className="mb-12 text-6xl font-bold text-primary-800">
          Our Medical Wards
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {wards.map((ward, index) => (
          <div
            key={index}
            className="w-full max-w-xs transition-transform duration-300 transform hover:scale-105 bg-white rounded-lg shadow-lg cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 hover:bg-blue-800 hover:shadow-2xl"
            onClick={() => handleCardClick(ward)}
          >
            <div className="flex flex-col items-center p-6 h-auto">
              <div className="mb-4">{ward.icon}</div>
              <h1 className="text-2xl font-bold text-center text-black">
                {ward.name}
              </h1>
              <p className="mt-4 text-center text-gray-600">
                {ward.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedWard && (
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-center text-primary-800">
            Related Wards for {selectedWard}
          </h3>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {wards
              .find((ward) => ward.name === selectedWard)
              ?.relatedWards?.map((relatedWard, index) => (
                <div
                  key={index}
                  className="w-full max-w-xs transition-transform duration-300 transform hover:scale-105 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4 hover:bg-blue-800 hover:shadow-2xl"
                  onClick={() => handleRelatedWardClick(relatedWard)}
                >
                  <div className="flex flex-col items-center p-6 h-auto">
                    <div className="mb-4">{relatedWard.icon}</div>
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                      {relatedWard.name}
                    </h1>
                    <div className="mt-4 text-gray-600">
                      {relatedWard.description.map((desc, i) => (
                        <div key={i} className="flex items-center mb-2">
                          <AiFillCaretRight className="text-green-500 text-2xl font-bold mr-2" />
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {isModalOpen && wardForModal && (
        <Modal ward={wardForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Ward;
