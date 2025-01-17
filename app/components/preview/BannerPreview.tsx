"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import ClearDatabase from "../generate-section/ClearDatabase";
import Spinner from "../loaders/Spinner";

export default function BannerPreview() {
  const data = useLiveQuery(() => db.banner.get(1));

  if (data) {
    const { title } = data;
    const { description } = data;
    const { tools } = data;

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
      <div className="w-full h-fit flex flex-col gap-1 items-center justify-center p-3 bg-main-blue/20">
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
          {/* Tools Section */}
          <div className="w-full h-1/3 flex items-center justify-center font-medium">
            {tools || "Loading..."}
          </div>
        </div>
        <ClearDatabase />
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
