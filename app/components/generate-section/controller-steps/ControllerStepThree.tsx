import React from "react";
import ToolOrStackSelector from "../selectors/ToolOrStackSelector";

export default function ControllerStepThree() {
  return (
    <div className=" w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-2 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-semibold rounded">
          Tools / Stack
        </p>
      </div>
      <ToolOrStackSelector />
    </div>
  );
}
