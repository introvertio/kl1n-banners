"use client";

import { resetFirstItemAndInitializeDB } from "@/lib/db";
import React, { useState } from "react";
import Clear from "@/svgs/Clear.svg";

export default function ClearDatabase() {
  const [sure, setSure] = useState(false);

  const handleReset = async () => {
    try {
      await resetFirstItemAndInitializeDB();
      setSure(false);
    } catch (error) {
      alert("An error occurred while resetting the database.");
    }
  };

  return (
    <div
      className={` flex flex-row gap-1 items-center justify-center w-38 h-10`}
    >
      {sure && (
        <>
          {" "}
          <small className="font-semibold text-xs">You sure?</small>{" "}
          <button
            onClick={() => {
              setSure(!sure);
            }}
            className={` bg-main-blue/70 text-white font-semibold rounded shadow transition-all active:scale-95 flex flex-row items-center justify-center h-10 w-20`}
          >
            <small>Cancel</small>
          </button>
        </>
      )}
      <button
        onClick={() => {
          if (sure) {
            handleReset();
          } else {
            setSure(!sure);
          }
        }}
        className={` bg-red-600 text-white font-semibold rounded shadow transition-all active:scale-95 flex flex-row items-center justify-center h-10 w-20`}
      >
        <small>{sure ? `Yes` : `Clear`}</small>
        <Clear />
      </button>
    </div>
  );
}
