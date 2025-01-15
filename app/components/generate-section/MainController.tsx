import React from "react";
import BannerEditor from "../temp/BannerEditor";
import ControllerStepOne from "./controller-steps/ControllerStepOne";

export default function MainController() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <ControllerStepOne />
    </div>
  );
}
