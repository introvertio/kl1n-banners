"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function BannerPreview() {
  const data = useLiveQuery(() => db.banner.get(1));

  const renderSkills = () => {
    if (data)
      if (data?.description?.skills?.length > 0) {
        const { skills, skillsSeperator } = data.description;

        if (skillsSeperator) {
          return skills.join(skillsSeperator);
        }
        return skills.join(" ");
      }

    return "No skills selected";
  };

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1 w-full mx-auto p-3">
        <div className="w-full h-1 rounded animate-pulse bg-main-blue"></div>
        <div className="w-full aspect-[820/310] bg-white flex flex-col items-center justify-between max-w-2xl font-bold p-2 shadow">
          {/* Title Section */}
          <div className="w-full h-1/3 flex items-center justify-center">
            <p
              className={`w-full ${data?.title?.font} ${
                data?.title?.alignment == "left"
                  ? "text-left"
                  : data?.title?.alignment == "right"
                  ? "text-right"
                  : "text-center"
              } ${data?.title?.italic ? "italic" : ""}`}
              style={{
                fontSize: `${data?.title?.fontSize}px`,
                fontWeight: data?.title?.fontWeight,
                color: `${data?.title.color}`,
              }}
            >
              {data?.title?.text}
            </p>
          </div>
          {/* Description/Skills Section */}
          <div className="w-full h-1/3 flex items-center justify-center">
            {data?.description?.useDescription ? (
              <p
                className={`w-full ${data?.description?.font} ${
                  data?.description?.alignment == "left"
                    ? "text-left"
                    : data?.description?.alignment == "right"
                    ? "text-right"
                    : "text-center"
                } ${data?.description?.italic ? "italic" : ""}`}
                style={{
                  fontSize: `${data?.description?.fontSize}px`,
                  fontWeight: data?.description?.fontWeight,
                  color: `${data?.description.color}`,
                }}
              >
                {data?.description?.text}
              </p>
            ) : (
              <p
                className={`w-full ${data?.description?.font} ${
                  data?.description?.alignment == "left"
                    ? "text-left"
                    : data?.description?.alignment == "right"
                    ? "text-right"
                    : "text-center"
                } ${data?.description?.italic ? "italic" : ""}`}
                style={{
                  fontSize: `${data?.description?.fontSize}px`,
                  fontWeight: data?.description?.fontWeight,
                  color: `${data?.description.color}`,
                }}
              >
                {renderSkills()}
              </p>
            )}
          </div>
          {/* Tools Section */}
          <div className="w-full h-1/3 flex items-center justify-center font-medium">
            {data?.tools || "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}
