"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, resetFirstItemAndInitializeDB } from "@/lib/db";
import ClearDatabase from "../generate-section/ClearDatabase";
import Spinner from "../loaders/Spinner";
import Download from "@/svgs/Download.svg";
import { toolOptions } from "../static/stack-tools";

export default function BannerPreview() {
  const data = useLiveQuery(() => db.banner.get(1));

  if (data) {
    const { title } = data;
    const { description } = data;
    const { tools } = data;

    //clean up incase user db has not updated for new tools structure
    async function Cleanup() {
      if (!tools.tools) await resetFirstItemAndInitializeDB();
    }
    Cleanup();

    const matchedTools = tools.tools.map((tool) => {
      const match = toolOptions.find(
        (item) => item.name.toLowerCase() === tool.toLowerCase()
      );
      return match || { name: tool, icon: null }; // Fallback if no icon is found
    });

    const renderSkills = () => {
      if (description.skills.length > 0) {
        const { skills, skillsSeperator } = description;

        if (skillsSeperator) {
          return skills.join(skillsSeperator);
        }
        return skills.join(" ");
      }

      return "No skills selected";
    };

    return (
      <div className="w-full h-fit flex flex-col gap-1 items-center justify-center p-1 bg-main-blue/20">
        <div className="w-full aspect-[820/310] bg-white flex flex-col items-center justify-between max-w-2xl font-bold p-2">
          {/* Title Section */}
          <div className="w-full h-1/3 flex items-center justify-center">
            <p
              className={`w-full ${title.font} ${
                title.alignment == "left"
                  ? "text-left"
                  : title.alignment == "right"
                  ? "text-right"
                  : "text-center"
              } ${title.italic ? "italic" : ""}`}
              style={{
                fontSize: `${title.fontSize}px`,
                fontWeight: title.fontWeight,
                color: `${title.color}`,
              }}
            >
              {title.text}
            </p>
          </div>
          {/* Description/Skills Section */}
          <div className="w-full h-1/3 flex items-center justify-center">
            {description.useDescription ? (
              <p
                className={`w-full ${description.font} ${
                  description.alignment == "left"
                    ? "text-left"
                    : description.alignment == "right"
                    ? "text-right"
                    : "text-center"
                } ${description.italic ? "italic" : ""}`}
                style={{
                  fontSize: `${description.fontSize}px`,
                  fontWeight: description.fontWeight,
                  color: `${description.color}`,
                }}
              >
                {description.text}
              </p>
            ) : (
              <p
                className={`w-full ${description.font} ${
                  description.alignment == "left"
                    ? "text-left"
                    : description.alignment == "right"
                    ? "text-right"
                    : "text-center"
                } ${description.italic ? "italic" : ""}`}
                style={{
                  fontSize: `${description.fontSize}px`,
                  fontWeight: description.fontWeight,
                  color: `${description.color}`,
                }}
              >
                {renderSkills()}
              </p>
            )}
          </div>
          <div className="w-full h-1/3 flex items-center justify-center font-medium">
            {tools.tools ? (
              <>
                {matchedTools.map(({ name, icon }, id) => (
                  <div key={id} title={name} className="text-2xl">
                    {icon || "🛠"}
                  </div>
                ))}
              </>
            ) : (
              <small>add your tools</small>
            )}
          </div>
        </div>
        <div className=" flex flex-row items-center justify-center gap-2">
          <button className="flex flex-row gap-1 text-white items-center justify-center font-semibold bg-main-blue rounded w-32 h-8 shadow transition-all active:scale-95">
            <small>Download</small> <Download />
          </button>
          <ClearDatabase />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-fit flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }
}
