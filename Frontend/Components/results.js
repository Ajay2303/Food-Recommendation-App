import React from "react";

const bodyTypeData = {
  Underweight: {
    message: "You're below the recommended weight. Prioritize nutrient-rich meals to support your health.",
    color: "bg-blue-500 text-white",
    emoji: "📉",
    quote: "Nourishment fuels strength—focus on steady growth!"
  },
  Normal: {
    message: "You're at a healthy weight. Keep up your balanced lifestyle for long-term well-being.",
    color: "bg-green-500 text-white",
    emoji: "✅",
    quote: "Good health is built on consistent, smart choices!"
  },
  Overweight: {
    message: "Your weight is slightly above the ideal range. Small lifestyle changes can make a big difference.",
    color: "bg-yellow-500 text-gray-900",
    emoji: "⚠️",
    quote: "Every step counts—progress over perfection!"
  },
  Obese: {
    message: "Your weight is significantly above the recommended range. Gradual changes can greatly improve your well-being.",
    color: "bg-red-500 text-white",
    emoji: "🚨",
    quote: "Your health journey starts now—believe in yourself!"
  },
  Muscular: {
    message: "Your body has a high muscle mass. Keep training and fueling your body correctly.",
    color: "bg-purple-500 text-white",
    emoji: "💪",
    quote: "Strength is built with patience and effort—stay strong!"
  },
};

const Results = ({ results, onRecalculate }) => {
  if (!results) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300">
        No data available. Please enter your details.
      </div>
    );
  }

  const { bmr, tdee, bfp, bodyType } = results;
  const typeData = bodyTypeData[bodyType] || {
    message: "Health is a continuous journey. Keep improving every day!",
    color: "bg-gray-500 text-white",
    emoji: "🌱",
    quote: "Every step forward is a step toward a healthier life."
  };

  return (
    <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg text-center">
      {/* Health Report Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        🏋️‍♂️ Health Assessment Report
      </h2>

      {/* Body Type Section */}
      <div className={`p-6 rounded-lg shadow-md ${typeData.color}`}>
        <h3 className="text-3xl font-bold flex items-center justify-center mb-3">
          {typeData.emoji} {bodyType || "Unknown"} {typeData.emoji}
        </h3>

        {/* Stylized Message Box */}
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            <span className="inline-block text-2xl">💡</span> {typeData.message}
          </p>
        </div>

        {/* Quote Box with Gradient Background */}
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-700 shadow-md rounded-lg border-l-4 border-gray-500">
          <p className="text-md italic font-medium text-gray-700 dark:text-gray-300">
            “{typeData.quote}”
          </p>
        </div>
      </div>

      {/* Health Metrics Section */}
      <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          📊 Health Metrics
        </h3>
        <p className="text-lg font-medium">
          <strong>🔥 Calories Burned at Rest:</strong> {bmr ? `${bmr.toFixed(2)} kcal/day` : "N/A"}
        </p>
        <p className="text-lg font-medium">
          <strong>🥗 Daily Calories Needed:</strong> {tdee ? `${tdee.toFixed(2)} kcal/day` : "N/A"}
        </p>
        <p className="text-lg font-medium">
          <strong>💪 Body Fat Percentage:</strong> {bfp ? `${bfp.toFixed(2)}%` : "N/A"}
        </p>
      </div>

      {/* 🚀 Enhanced Recalculate Button */}
      <button
        onClick={onRecalculate}
        className="mt-6 px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600
                   rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300
                   relative overflow-hidden"
      >
        <span className="absolute inset-0 flex items-center justify-center bg-white opacity-10 rounded-full"></span>
        🔄 Go Back
      </button>
    </div>
  );
};

export default Results;