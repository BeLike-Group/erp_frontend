import React from "react";
import Logo from "../../../Assets/Img/dg.png"; // Replace with your actual logo path
import hospital1 from "../../../Assets/Medical/hospital/hospital1.png";
import hospital2 from "../../../Assets/Medical/hospital/hospital10.png"; // Replace with your actual hospital logo path
import { Link } from "react-router-dom";

const Hospital = () => {
    const hospitals = [
        {
            name: "City Complex",
            logo: hospital1,
            email: "info@citycomplex.com",
            contact: "+923045678910",
            location: "https://maps.google.com/?q=31.473951,74.241249",
            link: "/detail" // Corrected property name to 'link'
        },
        {
            name: "Lahore Complex", // Corrected spelling of 'Lahore'
            logo: hospital2,
            email: "info@lahorecomplex.com", // Changed email for clarity
            contact: "+923045678910",
            location: "https://maps.google.com/?q=31.5497,74.3436", // Updated location for Lahore Hospital
            link: "/details" // Corrected property name to 'link'
        },
    ];

    return (
        <div className="pb-32 pl-52 pr-52 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600">
            <div className="flex items-center justify-center gap-2.5 mb-10">
                {/* <h1 className="text-2xl font-bold">Belike Edu. Software</h1>
                <img src={Logo} alt="Belike Edu. Logo" className="w-16 h-16"/> */}
                            <h1 className="mt-20 text-3xl font-bold text-center">Our Partner Complex</h1>

            </div>
            
            <div className="grid grid-cols-1 gap-5">
                {hospitals.map((hospital, index) => (
                    <Link to={hospital.link} key={index}>
                        <div className="flex flex-col items-center justify-center p-4 overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg md:flex-row hover:scale-105 hover:shadow-xl">
                            <div className="flex items-center justify-center w-full p-10 md:w-1/2">
                                <img src={hospital.logo} alt={hospital.name} className="object-contain w-40 h-40 transition-transform duration-300 transform border border-gray-300 rounded-full hover:scale-105"/>
                                <h1 className="ml-4 text-xl font-semibold text-black">{hospital.name}</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full p-4 md:w-1/2">
                                <p className="text-lg text-black">{hospital.email}</p>
                                <p className="text-lg text-black">{hospital.contact}</p>
                                <button 
                                    className="px-4 py-2 mt-4 font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded hover:bg-blue-700 hover:shadow-lg hover:scale-105"
                                    onClick={() => window.open(hospital.location, "_blank")}
                                >
                                    Go to Location
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hospital;
