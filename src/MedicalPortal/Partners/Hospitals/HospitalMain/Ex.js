import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Ex = () => {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it enters the view
    onChange: (inView) => {
      if (inView) {
        setStartCount(true);
      }
    },
  });

  return (
    <div className="py-16 bg-transparent" ref={ref}>
      <div className="text-center">
        <h2 className="mb-12 text-5xl font-extrabold text-gray-800">Our Experience & Statistics</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        
        {/* Years of Experience */}
        <div className="w-full sm:w-1/4">
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
            <h3 className="text-4xl font-bold text-green-600">
              {startCount && <CountUp end={25} duration={4} />}
              <span className="text-xl">+</span>
            </h3>
            <p className="mt-2 text-lg text-gray-600">Years of Experience</p>
          </div>
        </div>
        
        {/* Total Patients Treated */}
        <div className="w-full sm:w-1/4">
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
            <h3 className="text-4xl font-bold text-green-600">
              {startCount && <CountUp end={100000} duration={4} separator="," />}
              <span className="text-xl">+</span>
            </h3>
            <p className="mt-2 text-lg text-gray-600">Patients Treated</p>
          </div>
        </div>

        {/* Total Doctors */}
        <div className="w-full sm:w-1/4">
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
            <h3 className="text-4xl font-bold text-green-600">
              {startCount && <CountUp end={200} duration={5} />}
              <span className="text-xl">+</span>
            </h3>
            <p className="mt-2 text-lg text-gray-600">Doctors on Staff</p>
          </div>
        </div>
        
        {/* Total Rooms */}
        <div className="w-full sm:w-1/4">
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
            <h3 className="text-4xl font-bold text-green-600">
              {startCount && <CountUp end={300} duration={5} />}
              <span className="text-xl">+</span>
            </h3>
            <p className="mt-2 text-lg text-gray-600">Patient Rooms</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ex;

