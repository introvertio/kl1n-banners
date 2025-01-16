"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function BannerPreview() {
  const data = useLiveQuery(() => db.banner.get(1));

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 w-full mx-auto p-3">
        <span className="text-main-blue font-extrabold text-xs flex flex-row items-center justify-center gap-1 animate-pulse">
          <p>Live Preview</p>
          <div className="size-3 rounded-full bg-main-blue"></div>
        </span>
        <div className="w-full aspect-[820/310] bg-white flex flex-col items-center justify-between max-w-2xl font-bold p-2 shadow">
          <div className="w-full h-1/3 flex items-center justify-center">
            <p
              className={` w-full ${data?.title?.font} ${
                data?.title?.alignment == "left"
                  ? "text-left"
                  : data?.title?.alignment == "right"
                  ? "text-right"
                  : `text-center`
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
          <div className="w-full h-1/3 flex items-center justify-center">
            <p
              className={` w-full ${data?.description?.font} ${
                data?.description?.alignment == "left"
                  ? "text-left"
                  : data?.description?.alignment == "right"
                  ? "text-right"
                  : `text-center`
              } ${data?.title?.italic ? "italic" : ""}`}
              style={{
                fontSize: `${data?.description?.fontSize}px`,
                fontWeight: data?.description?.fontWeight,
                color: `${data?.description.color}`,
              }}
            >
              {data?.description.text}
            </p>
          </div>
          <div className="w-full h-1/3 flex items-center justify-center">
            {data?.tools || "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}
