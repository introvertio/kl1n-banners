import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import Spinner from "../../loaders/Spinner";
import ToolsSelector from "../selectors/ToolsSelector";
import { toolOptions } from "../../static/stack-tools";
import ToolOrStackSelector from "../../temp/ToolOrStackSelector";

export default function ControllerStepThree() {
  const data = useLiveQuery(() => db.banner.get(1), []);

  const handleChange = async (
    key: string,
    value: string | number | boolean | string[] | null
  ): Promise<void> => {
    if (data) {
      await db.banner.put({
        ...data,
        tools: {
          ...data.tools,
          [key]: value,
        },
      });
    }
  };

  if (!data) {
    return (
      <div className="w-full h-fit flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { tools } = data;

  const handleToolToggle = (tool: string): void => {
    const updatedTools = tools.tools.includes(tool)
      ? tools.tools.filter((item) => item !== tool)
      : [...tools.tools, tool];

    handleChange("tools", updatedTools);
  };

  return (
    <div className="w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-2 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-semibold rounded">
          Tools / Stack
        </p>
      </div>
      <ToolsSelector
        tools={toolOptions}
        selectedTools={tools.tools}
        onToggle={(value) => handleToolToggle(value)}
      />
    </div>
  );
}
