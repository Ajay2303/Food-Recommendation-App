import React, { useState } from "react";
import { calculateHealthMetrics } from "../utils/calculations";

const HealthForm = ({ setResults, onNext }) => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    waist: "",
    neck: "",
    hip: "",
    age: "",
    gender: "male",
    activityLevel: "sedentary",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { weight, height, waist, neck, hip, age, gender, activityLevel } = formData;

    const parsedWeight = parseFloat(weight) || 0;
    const parsedHeight = parseFloat(height) || 0;
    const parsedWaist = parseFloat(waist) || 0;
    const parsedNeck = parseFloat(neck) || 0;
    const parsedHip = gender === "female" ? parseFloat(hip) || 0 : null;
    const parsedAge = parseInt(age) || 0;

    const healthMetrics = calculateHealthMetrics(
      parsedWeight,
      parsedHeight,
      parsedWaist,
      parsedNeck,
      parsedHip,
      parsedAge,
      gender,
      activityLevel
    );

    setResults(healthMetrics);
    onNext();
  };

  return (
    <div className="health-form-container flex flex-col items-center p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🏋️‍♂️ Enter Your Health Details</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required className="input-field" />
        <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required className="input-field" />
        <input type="number" name="waist" placeholder="Waist (cm)" value={formData.waist} onChange={handleChange} required className="input-field" />
        <input type="number" name="neck" placeholder="Neck (cm)" value={formData.neck} onChange={handleChange} required className="input-field" />

        {formData.gender === "female" && (
          <input type="number" name="hip" placeholder="Hip (cm)" value={formData.hip} onChange={handleChange} required className="input-field" />
        )}

        <input type="number" name="age" placeholder="Age " value={formData.age} onChange={handleChange} required className="input-field" />

        <select name="gender" value={formData.gender} onChange={handleChange} className="dropdown">
          <option value="male">🚹 Male</option>
          <option value="female">🚺 Female</option>
        </select>

        <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="dropdown">
          <option value="sedentary">🏠 Sedentary (Little to no exercise)</option>
          <option value="light">🚶‍♂️ Lightly Active (1-3 days/week exercise)</option>
          <option value="moderate">🏃 Moderately Active (3-5 days/week exercise)</option>
          <option value="active">🏋️‍♂️ Active (6-7 days/week exercise)</option>
          <option value="veryActive">🔥 Very Active (Hard exercise daily)</option>
        </select>

        {/* 🚀 Updated Calculate Button */}
        <button
          type="submit"
          className="relative group overflow-hidden px-6 py-3 text-lg font-extrabold text-white rounded-lg shadow-xl transition-transform transform hover:scale-110
                     bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500">
          <span className="absolute inset-0 flex items-center justify-center bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
          ⚡ <span className="relative z-10">CALCULATE NOW</span>
        </button>

      </form>
    </div>
  );
};

export default HealthForm;