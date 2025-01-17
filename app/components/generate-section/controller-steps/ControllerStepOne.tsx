"use client";

import { db } from "@/lib/db";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { fonts } from "../../styling/font-classes";
import Spinner from "../../loaders/Spinner";
import FontSelector from "../selectors/FontSelector";
import ItalicSelector from "../selectors/ItalicSelector";
import AlignSelector from "../selectors/AlignSelector";
import FontWeightSelector from "../selectors/FontWeightSelector";
import FontSizeSelector from "../selectors/FontSizeSelector";

export default function ControllerStepOne() {
  const data = useLiveQuery(() => db.banner.get(1), []);

  const handleChange = async (
    key: string,
    value: string | number | boolean
  ) => {
    if (data) {
      await db.banner.put({
        ...data,
        title: {
          ...data.title,
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

  const { title } = data;

  return (
    <div className=" w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-2 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-semibold rounded">
          Title
        </p>
        <input
          type="text"
          name="text"
          value={title.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className=" shadow w-full p-2 rounded outline-none font-medium focus:ring-2 focus:ring-main-blue transition-all caret-main-blue"
        />
        <FontSelector
          fonts={fonts}
          selectedFont={title.font}
          onChange={(value) => handleChange("font", value)}
          titleText={title.text}
          italic={title.italic}
        />
        <div className="flex flex-row gap-1 items-end justify-between">
          <ItalicSelector
            isItalic={title.italic}
            weight={title.fontWeight}
            font={title.font}
            onChange={(value) => handleChange("italic", value)}
          />
          <AlignSelector
            alignment={title.alignment}
            onChange={(value) => handleChange("alignment", value)}
          />
        </div>
        <FontWeightSelector
          font={title.font}
          weight={title.fontWeight}
          onChange={(value) => handleChange("fontWeight", value)}
        />
        <FontSizeSelector
          size={title.fontSize}
          onChange={(value) => handleChange("fontSize", value)}
        />
        <div className="relative flex flex-col w-full h-full">
          <p className="text-black font-medium text-xs mr-auto">Text color</p>
          <input
            className="w-full h-10 outline-none rounded active:scale-95 transition-all shadow "
            type="color"
            value={title.color}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
