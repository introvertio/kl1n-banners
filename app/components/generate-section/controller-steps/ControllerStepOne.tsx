"use client";

import { db } from "@/lib/db";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  bespokeFont,
  cabinetFont,
  chillaxFont,
  exconFont,
  satoshiFont,
  supremeFont,
} from "../../styling/font-classes";
import Spinner from "../../loaders/Spinner";
import FontSelector from "../selectors/FontSelector";

const fonts = [
  { name: "Bespoke", value: bespokeFont },
  { name: "Supreme", value: supremeFont },
  { name: "Cabinet", value: cabinetFont },
  { name: "Chillax", value: chillaxFont },
  { name: "Satoshi", value: satoshiFont },
  { name: "Excon", value: exconFont },
];

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
    <div className=" w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="text"
          value={title.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <FontSelector
          fonts={fonts}
          selectedFont={title.font}
          onChange={(value) => handleChange("font", value)}
          titleText={title.text}
          italic={title.italic}
        />
        <label className="flex flex-col">
          Font Weight:
          <input
            type="number"
            name="fontWeight"
            min={100}
            max={900}
            step={100}
            value={title?.fontWeight || 400}
            onChange={(e) =>
              handleChange("fontWeight", parseInt(e.target.value))
            }
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label className="flex items-center gap-2">
          Italic:
          <input
            type="checkbox"
            checked={title?.italic || false}
            onChange={(e) => handleChange("italic", e.target.checked)}
          />
        </label>
        <label className="flex items-center gap-2">
          Color:
          <input
            type="color"
            value={title?.color}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Font Size:
          <input
            type="number"
            name="fontSize"
            min={12}
            max={100}
            value={title?.fontSize || 16}
            onChange={(e) => handleChange("fontSize", parseInt(e.target.value))}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <select
          value={title?.alignment || "center"}
          onChange={(e) => handleChange("alignment", e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
  );
}
