import React, { useState } from "react";
import Add from "@/svgs/Add.svg";
import Remove from "@/svgs/Remove.svg";
import { TechItem, toolOptions } from "../../static/stack-tools";

interface ToolsSelectorProps {
  tools: TechItem[];
  selectedTools: string[];
  onToggle: (skill: string) => void;
}

export default function ToolsSelector({
  tools,
  selectedTools,
  onToggle,
}: ToolsSelectorProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Normalize tool names for consistent matching
  const normalize = (value: string) => value.toLowerCase().trim();

  // Filter icons based on search term
  const filteredIcons = tools.filter(({ name }) =>
    normalize(name).includes(normalize(searchTerm))
  );

  return (
    <div className="flex flex-col gap-1 mt-2 w-full">
      {/* Selected Icons */}
      <div className="flex flex-row flex-wrap gap-1 p-1 bg-main-blue/5 rounded border border-main-blue/50 w-full h-20 overflow-auto">
        {selectedTools.length > 0 ? (
          selectedTools.map((name, id) => {
            const tool = toolOptions.find(
              (item) => normalize(item.name) === normalize(name)
            );

            return (
              <button
                key={id}
                onClick={() => onToggle(name)}
                className="flex items-center gap-1 p-2 px-4 h-fit w-fit border border-main-blue bg-main-blue text-white rounded-full transition-all hover:bg-red-500 hover:border-red-500"
                title={`Remove ${name}`}
              >
                <div className="text-xl">{tool?.icon || "🛠"}</div>
                <small className="font-medium">{name}</small>
                <Remove className={`scale-75`} />
              </button>
            );
          })
        ) : (
          <small className="text-main-blue font-medium">
            Select your stack!
          </small>
        )}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full h-10 shadow p-2 text-sm rounded outline-none focus:ring-2 focus:ring-main-blue transition-all"
      />

      {/* Icons */}
      <div className="flex flex-row flex-wrap gap-1 w-full h-40 overflow-auto rounded bg-main-blue/5 p-1 border border-main-blue/50">
        {filteredIcons.length > 0 ? (
          filteredIcons.map(({ name, icon }, id) => (
            <button
              key={id}
              onClick={() => onToggle(name)}
              className={`flex flex-row gap-1 items-center justify-center p-2 px-4 h-fit w-fit rounded-full transition-all font-medium ${
                selectedTools.some(
                  (selected) => normalize(selected) === normalize(name)
                )
                  ? "bg-main-blue text-white"
                  : "bg-white text-main-blue"
              } active:scale-95 border border-main-blue`}
              title={name}
            >
              <div
                className={`text-xl ${
                  selectedTools.some(
                    (selected) => normalize(selected) === normalize(name)
                  )
                    ? "text-white"
                    : "text-main-blue"
                }`}
              >
                {icon}
              </div>
              <small>{name}</small>
              {selectedTools.some(
                (selected) => normalize(selected) === normalize(name)
              ) ? (
                <Remove className={`scale-75`} />
              ) : (
                <Add className={`scale-75`} />
              )}
            </button>
          ))
        ) : (
          <small className="text-main-blue font-medium">
            No icons match your search.
          </small>
        )}
      </div>
    </div>
  );
}
