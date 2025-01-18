"use client";

import { db } from "@/lib/db";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Spinner from "../loaders/Spinner";

export default function BannerEditor() {
  const data = useLiveQuery(() => db.banner.get(1), []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the database record directly
    if (data) {
      await db.banner.put({
        ...data,
        [name]: value,
      });
    }
  };

  return (
    <>
      {data ? (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
          <h2 className="font-bold text-lg mb-4">Edit Banner</h2>
          <form className="flex flex-col gap-4">
            <label className="flex flex-col">
              Title:
              <input
                type="text"
                name="title"
                value={data.title.text}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="flex flex-col">
              Description:
              <input
                type="text"
                name="description"
                value={data.description.text}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="flex flex-col">
              Tools:
              <input
                type="text"
                name="tools"
                value={data.tools.tools}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
              />
            </label>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
