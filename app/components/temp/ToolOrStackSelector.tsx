import React, { useState } from "react";
import { toolOptions } from "../static/stack-tools";
import Add from "@/svgs/Add.svg";
import Remove from "@/svgs/Remove.svg";

interface Props {
  selected: string[];
}
export default function ToolOrStackSelector({ selected }: Props) {
  // Predefined icons
  const icons = toolOptions;

  // State for color, selected icons (names), and search term
  const [color, setColor] = useState<string>("#000000");
  const [selectedIcons, setSelectedIcons] = useState<string[]>(selected);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Toggle icon selection by name
  const toggleIcon = (name: string) => {
    setSelectedIcons((prev) =>
      prev.includes(name)
        ? prev.filter((iconName) => iconName !== name)
        : [...prev, name]
    );
  };

  // Filter icons based on search term
  const filteredIcons = icons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1 mt-2 w-full">
      {/* Selected Icons */}
      <div className="flex flex-row flex-wrap gap-1 p-1 bg-main-blue/5 rounded border border-main-blue/50 w-full h-20 overflow-auto">
        {selectedIcons.length > 0 ? (
          selectedIcons.map((name) => {
            const { icon } = icons.find((icon) => icon.name === name) || {};
            return (
              <button
                key={name}
                onClick={() => toggleIcon(name)}
                className="flex items-center gap-1 p-2 px-4 h-fit w-fit border border-main-blue bg-main-blue text-white rounded-full transition-all hover:bg-red-500 hover:border-red-500"
                title={`Remove ${name}`}
              >
                <div className="text-xl">{icon}</div>
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
          filteredIcons.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => toggleIcon(name)}
              className={`flex flex-row gap-1 items-center justify-center p-2 px-4 h-fit w-fit rounded-full transition-all font-medium ${
                selectedIcons.includes(name)
                  ? "bg-main-blue text-white"
                  : "bg-white text-main-blue"
              } active:scale-95 border border-main-blue`}
              title={name}
            >
              <div
                className={`text-xl ${
                  selectedIcons.includes(name) ? "text-white" : "text-main-blue"
                }`}
              >
                {icon}
              </div>
              <small>{name}</small>
              {selectedIcons.includes(name) ? (
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
