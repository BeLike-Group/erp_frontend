import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { NavLink } from 'react-router-dom';
import  Modal from '../../Partners/Hospitals/Time'; // Import the Modal component

const DoctorList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor

    const doctors = {
        "Our Doctors": [
            {
                name: "Dr. Ali",
                specialty: "Gynecologist, Obstetrician",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 5,
                satisfiedPatients: "100% (101)",
                image: "https://avatars.mds.yandex.net/i?id=260403c653728ea0f4d404e48015c06cbfe86aaa60050716-9678500-images-thumbs&n=13",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified",
                discountAvailable: true,
                discountPercentage: 50
            },
            {
                name: "Dr. Sarah",
                specialty: "Pediatrician",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 8,
                satisfiedPatients: "95% (76)",
                image: "https://randomuser.me/api/portraits/women/11.jpg",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified ",
                discountAvailable: true,
                discountPercentage: 50
            },
            {
                name: "Dr. Ahmed",
                specialty: "Cardiologist",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 12,
                satisfiedPatients: "98% (123)",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified",
                discountAvailable: true,
                discountPercentage: 40
            },
            {
                name: "Dr. Fatima",
                specialty: "Dermatologist",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 10,
                satisfiedPatients: "99% (87)",
                image: "https://randomuser.me/api/portraits/women/22.jpg",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified",
                discountAvailable: true,
                discountPercentage: 30
            },
            {
                name: "Dr. Hassan",
                specialty: "Orthopedic Surgeon",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 15,
                satisfiedPatients: "97% (65)",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified",
                discountAvailable: false,
                discountPercentage: 0
            },
            {
                name: "Dr. Ayesha",
                specialty: "ENT Specialist",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 7,
                satisfiedPatients: "94% (112)",
                image: "https://randomuser.me/api/portraits/women/33.jpg",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified",
                discountAvailable: false,
                discountPercentage: 0
            },
            {
                name: "Dr. Bilal",
                specialty: "Neurologist",
                qualifications: "MBBS, MCPS (Gynecology and Obstetrician)",
                experience: 18,
                satisfiedPatients: "96% (54)",
                image: "https://randomuser.me/api/portraits/men/5.jpg",
                onlineConsultation: true,
                onlineStatus: "Online -- PMC verified",
                discountAvailable: true,
                discountPercentage: 20
            }
        ]
    };

    const handleOpenModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedDoctor(null);
    };

    return (
        <div className="flex flex-wrap justify-center">
            {doctors["Our Doctors"].map((doctor, index) => (
                <div key={index} className="relative w-full max-w-screen-lg m-4 mx-auto overflow-hidden bg-white rounded-lg shadow-md">
                    <div className="absolute top-0 right-0 px-2 py-1 text-white bg-blue-600 rounded-tl-lg">
                        <p className="text-xs font-semibold">Online Status: {doctor.onlineStatus}</p>
                    </div>
                    <div className="p-4 mr-4">
                        <div className="flex items-center pr-5">
                            <div className="flex-shrink-0 w-32 h-32 pr-4 m-4 overflow-hidden rounded-full">
                                <img className="" src={doctor.image} alt="Doctor's Profile" />
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold text-black">{doctor.name}</h1>
                                <p className="font-semibold text-black">{doctor.specialty}</p>
                                <p className="text-lg text-gray-500">{doctor.qualifications}</p>
                            </div>
                            <div className="p-8 m-4 bg-gray-500 border border-gray-600 rounded-lg">
                                {doctor.onlineConsultation && (
                                    <div className="p-3 m-2 font-semibold text-black bg-blue-300 border rounded-lg">
                                        <FontAwesomeIcon icon={faVideo} />
                                        <span className="ml-2">Online Video Consultation</span>
                                    </div>
                                )}
                                {doctor.discountAvailable && (
                                    <div className="p-3 font-semibold text-black bg-blue-500 border rounded-md">
                                        <span>Pay Online, Get {doctor.discountPercentage}% Off</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex gap-4 px-4 text-black text-bold">
                                <div>
                                    <p>Experience</p>
                                    <p>{doctor.experience} Years</p>
                                </div>
                                <div>
                                    <p>Satisfied Patients</p>
                                    <p>{doctor.satisfiedPatients}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-5 p-3 bg-blue-600">
                        <button 
                            onClick={() => handleOpenModal(doctor)}
                            className="flex items-center p-2 font-semibold text-white bg-green-500 border">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span className="ml-2 text-white">Book Appointment</span>
                        </button>
                        <NavLink to={"/video"}>
                            <button className="flex items-center p-2 font-semibold text-white bg-red-600 border">
                                <FontAwesomeIcon icon={faVideo} />
                                <span className="ml-2">Video Consultation</span>
                            </button>
                        </NavLink>
                    </div>
                </div>
            ))}

            {/* Modal Component */}
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    doctor={selectedDoctor} // Pass selected doctor info if needed
                />
            )}
        </div>
    );
};

export default DoctorList;
