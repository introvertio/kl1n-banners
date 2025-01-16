import React from "react";
import FileSelector from "../../temp/FIleSelector";

export default function ControllerStepTwo() {
  return (
    <div className=" w-full flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-1 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-extrabold rounded">
          Description / Skills
        </p>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <div className="flex flex-row gap-2 w-full items-center justify-between">
            <p className="md:text-lg font-bold">Description</p>
            <button className="bg-white h-9 w-40 rounded shadow transition-all active:scale-95 text-sm font-bold">
              use Description
            </button>
          </div>
          <textarea
            className="shadow w-[344px] rounded p-1 outline-none focus:ring-2 focus:ring-main-blue transition-all font-bold"
            maxLength={100}
            defaultValue={`Default Description`}
          />
        </div>
        <small className="text-xs font-bold text-main-blue mx-auto">{`- or -`}</small>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <div className="flex flex-row gap-2 w-full items-center justify-between">
            <p className="md:text-lg font-bold">Skills</p>
            <button className="bg-white h-9 w-40 rounded shadow transition-all active:scale-95 text-sm font-bold">
              use Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
