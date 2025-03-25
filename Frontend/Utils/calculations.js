// BMI Calculation
export function calculateBMI(weight, height) {
  if (height <= 0) throw new Error("Height must be greater than zero.");
  return weight / ((height / 100) ** 2);
}

// Waist-to-Height Ratio (WHtR)
export function calculateWHtR(waist, height) {
  if (height <= 0) throw new Error("Height must be greater than zero.");
  return parseFloat(waist) / parseFloat(height);
}

// US Navy Method for Body Fat Percentage (BFP)
export function calculateBFP(waist, neck, height, gender, hip = null) {
  if (waist <= 0 || neck <= 0 || height <= 0 || (gender === "female" && (hip === null || hip <= 0))) {
    throw new Error("Invalid input values. All values must be positive numbers.");
  }

  const minDiff = 0.1; // To avoid log10 errors if waist and neck are too close

  if (gender === "male") {
    return 495 / (1.0324 - 0.19077 * Math.log10(Math.max(minDiff, waist - neck)) + 0.15456 * Math.log10(height)) - 450;
  } else {
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
}

// Mifflin-St Jeor BMR Calculation
export function calculateBMR(weight, height, age, gender) {
  return gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
}

// Katch-McArdle BMR Calculation (Validating BFP)
export function calculateBMR_KatchMcArdle(weight, bodyFatPercentage) {
  if (bodyFatPercentage < 0 || bodyFatPercentage >= 100) {
    throw new Error("Invalid BFP. Must be between 0 and 100.");
  }
  const leanMass = weight * (1 - bodyFatPercentage / 100);
  return 370 + (21.6 * leanMass);
}

// Harris-Benedict Activity Multipliers for TDEE
const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  super_active: 1.9,
};

// TDEE Calculation
export function calculateTDEE(bmr, activityLevel) {
  return bmr * (activityMultipliers[activityLevel] || 1.2); // Default to sedentary if invalid
}

// Body Type Classification (Using BFP, BMI & WHtR)
export function determineBodyType(bmi, whtr, bfp, gender) {
  if (bfp < 6) return "Underfat";
  if (bfp >= 6 && bfp <= 13) return gender === "male" ? "Athletic" : "Muscular";
  if (bfp > 13 && bfp <= 17) return gender === "female" ? "Fit" : "Muscular";
  if (bfp > 17 && bfp <= 25) return "Average";
  if (bfp > 25 && bfp <= 30) return "Overweight";
  if (bfp > 30) return "Obese";

  // Additional considerations using BMI & WHtR
  if (bmi >= 30 || whtr >= 0.6) return "Obese";
  if (bmi >= 25 || whtr >= 0.5) return "Overweight";
  if (bmi < 18.5 || whtr < 0.4) return "Underweight";

  return "Healthy";
}

// Master Function: Calculates All Health Metrics
export function calculateHealthMetrics(weight, height, waist, neck, hip, age, gender, activityLevel) {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("Weight, height, and age must be positive numbers.");
  }

  const bmi = calculateBMI(weight, height);
  const whtr = calculateWHtR(waist, height);
  const bfp = calculateBFP(waist, neck, height, gender, hip);

  // Use Katch-McArdle BMR if BFP is available, otherwise use Mifflin-St Jeor
  const bmr = bfp > 0 ? calculateBMR_KatchMcArdle(weight, bfp) : calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const bodyType = determineBodyType(bmi, whtr, bfp, gender);

  return { bmi, whtr, bfp, bmr, tdee, bodyType };
}