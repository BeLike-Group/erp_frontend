import React, { useState, useEffect } from "react";
import investor1 from "./Pics/investor/investor1.png";
import investor2 from "./Pics/investor/investor2.png";
import investor3 from "./Pics/investor/investor3.png";
import investor4 from "./Pics/investor/investor4.png";
import investor5 from "./Pics/investor/investor5.png";
import investor6 from "./Pics/investor/investor6.png";
const Investor = () => {
  const projects = [
    {
      imagel: investor1,
    },
    {
      imagel: investor2,
    },
    {
      imagel: investor3,
    },
    {
      imagel: investor4,
    },
    {
      imagel: investor5,
    },
    {
      imagel: investor6,
    },
    {
      imagel: investor1,
    },
    {
      imagel: investor2,
    },
    {
      imagel: investor3,
    },
    {
      imagel: investor4,
    },
    {
      imagel: investor5,
    },
    {
      imagel: investor6,
    },
    // Add more projects as needed
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const slidesPerRow = 4; // Number of slides to show per row

  const totalRows = Math.ceil(projects.length / slidesPerRow);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % totalRows);
    }, 3000); // Change row every 2 seconds

    return () => clearInterval(interval);
  }, [totalRows]);

  return (
    <div className="justify-center items-center bg-gradient-to-r from-blue-500 to-white">
      <h1 className=" text-5xl text-black font-bold text-center py-10">
        Investors
      </h1>
      <p className="text-center text-black">
        DK Group attracts investors seeking superior returns and ethical
        investment <br />
        opportunities supported by robust financial expertise
        <br /> and a proven track record.
      </p>
      <div className="container mx-auto px-4 md:px-24 m-16">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {projects
            .slice(currentSet * slidesPerRow, (currentSet + 1) * slidesPerRow)
            .map((project, index) => (
              <div
                key={index}
                className="m-3 bg-white rounded-2xl hover:scale-105"
              >
                <div className="relative flex justify-center items-center hover:cursor-pointer ">
                  <div className="overflow-hidden w-32 h-50 flex items-center justify-center p-4">
                    <img
                      className=" h-[4rem] object-cover object-center rounded"
                      src={project.imagel}
                      alt="Team Member"
                    />
                  </div>
                  {/* <div className="absolute inset-0 bg-black  transition duration-300"></div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Investor;
