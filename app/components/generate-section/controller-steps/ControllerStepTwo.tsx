import React from "react";
import FileSelector from "../../temp/FIleSelector";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import Spinner from "../../loaders/Spinner";

export default function ControllerStepTwo() {
  const data = useLiveQuery(() => db.banner.get(1), []);

  const handleChange = async (
    key: string,
    value: string | number | boolean
  ) => {
    if (data) {
      await db.banner.put({
        ...data,
        description: {
          ...data.description,
          [key]: value,
        },
      });
    }
  };

  if (!data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { description } = data;

  return (
    <div className=" w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
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
            className="shadow w-full rounded p-2 outline-none focus:ring-2 focus:ring-main-blue transition-all font-bold"
            maxLength={100}
            onChange={(e) => handleChange("text", e.target.value)}
            value={description.text}
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
          <FileSelector />
        </div>
      </div>
    </div>
  );
}
