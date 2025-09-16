import React, { useState } from "react";

const OurWorks = () => {
  const works = [
    "/images/work1.jpg",
    "/images/work2.jpg",
    "/images/work3.jpg",
    "/images/work4.jpg",
    "/images/work5.jpg",
    "/images/work6.jpg",
  ];

  const [showAll, setShowAll] = useState(false);

  const displayedWorks = showAll ? works : works.slice(0, 3);

  return (
    <div className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-rose-500">Our Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedWorks.map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
            <img
              src={img}
              alt={`Work ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <p className="text-white font-semibold text-lg">View Project</p>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition">
            Show All
          </button>
        </div>
      )}
    </div>
  );
};

export default OurWorks;
