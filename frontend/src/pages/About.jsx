import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Who We Are
            </h2>

            <p className="leading-relaxed text-gray-600">
              We are a passionate team committed to driving change through
              innovation and collaboration. Our platform is designed to empower
              individuals and organizations to unlock their true potential.
            </p>
          </div>

          {/* Right (image) */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="transition-transform duration-300 rounded-lg shadow-lg hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full py-12 bg-gray-100">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Meet Our Team
        </h2>

        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="Team member"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              Arjun Mahato
            </h3>

            <p className="text-gray-500">CEO</p>
          </div>

          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
              alt="Team member"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              Rupesh Yadav
            </h3>

            <p className="text-gray-500">CTO</p>
          </div>

          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
              alt="Team member"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              Krishna Yadav
            </h3>

            <p className="text-gray-500">Lead Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
