import React, { useState } from "react";
import WelcomePage from "./components/welcomepage";
import HealthForm from "./components/healthform";
import Results from "./components/results";
import "./styles/style.css"; // Ensure styling

function App() {
  const [results, setResults] = useState(null);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleRecalculate = () => {
    setResults(null); // Clears previous results
    setStep(2); // Redirects to HealthForm
  };

  return (
    <div className="container mx-auto p-4">
      {step === 1 && <WelcomePage onNext={handleNext} />}
      {step === 2 && <HealthForm setResults={setResults} onNext={handleNext} />}
      {step === 3 && <Results results={results} onRecalculate={handleRecalculate} />}
    </div>
  );
}

export default App;