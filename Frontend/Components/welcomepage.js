import React from "react";

const WelcomePage = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white px-6">
      <h2 className="text-3xl font-extrabold mb-4">🚀 Welcome to Your Health Tracker</h2>
      <p className="text-lg text-center max-w-lg mb-6">
        Thank you for taking the first step towards better health! Start tracking your fitness and improve your well-being today. 💪
      </p>

      {/* 🌟 Modern "Get Started" Button */}
      <button
        onClick={onNext}
        className="relative px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full
                   shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl focus:outline-none">
        <span className="absolute inset-0 flex items-center justify-center bg-white opacity-10 rounded-full"></span>
        🎯 Get Started
      </button>
    </div>
  );
};

export default WelcomePage;