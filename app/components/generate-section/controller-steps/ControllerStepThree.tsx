import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import Spinner from "../../loaders/Spinner";
import ToolsSelector from "../selectors/ToolsSelector";

export default function ControllerStepThree() {
  const data = useLiveQuery(() => db.banner.get(1), []);
  return (
    <div className=" w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-2 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-semibold rounded">
          Tools / Stack
        </p>
      </div>
      <ToolsSelector />
    </div>
  );
}
