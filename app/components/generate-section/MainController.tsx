"use client";

import React, { useEffect, useState } from "react";
import ControllerStepOne from "./controller-steps/ControllerStepOne";

export default function MainController() {
  // Define the max and min steps
  const MAX_STEP = 4;
  const MIN_STEP = 1;

  const [currentStep, setCurrentStep] = useState(MIN_STEP);

  // Parse the `step` from the URL hash
  const getStepFromHash = () => {
    const hash = window.location.hash;
    const stepMatch = hash.match(/step=(\d+)/);
    const step = stepMatch ? parseInt(stepMatch[1], 10) : MIN_STEP;
    return step >= MIN_STEP && step <= MAX_STEP ? step : MIN_STEP;
  };

  const updateUrl = (step: number) => {
    window.history.replaceState(null, "", `#start?step=${step}`);
  };

  // Navigate to a specific step
  const goToStep = (step: number) => {
    if (step >= MIN_STEP && step <= MAX_STEP) {
      setCurrentStep(step);
      updateUrl(step);
    } else {
      // Reset to step 1 if invalid step
      setCurrentStep(MIN_STEP);
      updateUrl(MIN_STEP);
    }
  };

  // Handle "Next" and "Previous" button clicks
  const goToNextStep = () => {
    if (currentStep < MAX_STEP) {
      goToStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > MIN_STEP) {
      goToStep(currentStep - 1);
    }
  };

  useEffect(() => {
    // Set the step based on the hash when the component mounts
    const step = getStepFromHash();
    setCurrentStep(step);

    // Listen to hash changes for manual URL edits
    const handleHashChange = () => {
      const step = getStepFromHash();
      setCurrentStep(step);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-fit h-fit flex flex-col gap-2">
        {/* Render step content dynamically */}
        {currentStep === 1 && <ControllerStepOne />}
        {currentStep === 2 && <div>Step 2 Content</div>}
        {currentStep === 3 && <div>Step 3 Content</div>}
        {currentStep === 4 && <div>Step 4 Content</div>}

        {/* Navigation Buttons */}
        <div className="flex flex-row items-center justify-between w-full mt-4">
          {currentStep > MIN_STEP && (
            <button
              onClick={goToPreviousStep}
              className="w-28 h-14 text-main-blue font-bold border-4 border-main-blue rounded-md mr-auto transition-all active:scale-95"
            >
              Previous
            </button>
          )}
          {currentStep < MAX_STEP && (
            <button
              onClick={goToNextStep}
              className="w-28 h-14 bg-main-blue text-white font-bold border-4 border-main-blue rounded ml-auto transition-all active:scale-95"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
