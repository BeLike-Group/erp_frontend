import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
// import Project from "./Project.js";
import Info from "./Info.js";
import Team from "./Team.js";
import Investor from "./Investor.js";
// import heroimg from "../../Assets/hero-section-img.webp";
import schoolimg from "../../Assets/school.webp";
import collegeimg from "../../Assets/college.webp";
import universityimg from "../../Assets/uni.webp";
import Itskillimg from "../../Assets/it.webp";
import travelimg from "../../Assets/travel.webp";
import internationalimg from "../../Assets/int-edu.png";
import marketimg from "../../Assets/market.webp";
import foodimg from "../../Assets/food1.webp";
import donationimg from "../../Assets/donate.webp";
import belikecustomimg from "../../Assets/bgp.webp";
import belikecustomimg2 from "../../Assets/Images/customer.jpeg";
import belikeproperty from "../../Assets/property.png";
import ecomimg from "../../Assets/e-com.webp";
import jobimg from "../../Assets/jobs.webp";
import healthimg from "../../Assets/health.webp";
import add from "./Pics/hero_vid/herovideo1.mp4";
import chat from "../../Assets/Img/chat.jpg";
const services = [
  { img: belikecustomimg, title: "Our IT Clients", link: "/schoolblock2" },
  { img: schoolimg, title: "Schools", link: "/school-portal-home" },
  { img: collegeimg, title: "Colleges", link: "/schoolblocks" },
  { img: universityimg, title: "Universities", link: "/uni-portal-home" },
  { img: healthimg, title: "Health", link: "/health-portal-home" },
  { img: belikeproperty, title: "Property Services", link: "/ser-portal-home" },
  { img: Itskillimg, title: "IT Skills", link: "/it-portal-home" },
  {
    img: donationimg,
    title: "Welfare Activities",
    link: "/donation-portal-home",
  },
  { img: travelimg, title: "Travel", link: "/tra-portal-home" },
  {
    img: internationalimg,
    title: "International Consultant",
    link: "/Consultant-portal-home",
  },
  {
    img: ecomimg,
    title: "Ecommerce",
    link: "https://monumental-pasca-c60596.netlify.app/",
  },
  { img: jobimg, title: "Jobs", link: "/Job-portal-home" },
  {
    img: marketimg,
    title: "Influencer/Bloggers",
    link: "/Influencer-portal-home",
  },
  { img: foodimg, title: "Food", link: "/food-portal-home" },
  { img: belikecustomimg2, title: "Legal Service", link: "/legal-home-portal" },
];

const Landingpage = () => {
  return (
    <>
      <div className="">
        <Navbar />
        {/* Hero Section */}

        <div className="p-4 sm:p-8 md:p-20 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
          <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-6">
            {/* Video Section */}
            <motion.div
              className="w-full flex justify-center mt-4 md:mt-0 "
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <video
                autoPlay
                loop
                controls // Adds controls for play/pause, volume, etc.
                className="w-full max-h-[50vh] md:max-h-[70vh] rounded-lg"
              >
                <source src={add} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>

        {/* Services Section */}
        <div
          className="relative py-16 bg-gradient-to-r from-blue-400 to-white"
          id="servicesSection"
        >
          <a
            href="https://chatapp-rosy-eta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={chat}
              alt=""
              className="absolute top-4 right-8 w-24 h-24 sm:w-40 sm:h-40 object-contain cursor-pointer hover:opacity-80 transition duration-300"
            />
          </a>

          <div className="container mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8">
              Our IT Portal Services
              <p className="text-[1rem] pt-2">(Belike Software)</p>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="transform hover:scale-105 transition duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Link
                    to={service.link}
                    className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-white to-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                  >
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-4"
                    />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {service.title}
                    </h2>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* <Project /> */}
        <Info />
        <Team />
        <Investor />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Landingpage;
