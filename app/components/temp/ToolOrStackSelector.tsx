import React, { useState } from "react";
import { tools } from "../static/stack-tools";

const ToolOrStackSelector: React.FC = () => {
  // Predefined icons
  const icons = tools;

  // State for color, selected icons, and search term
  const [color, setColor] = useState<string>("#000000");
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Toggle icon selection
  const toggleIcon = (id: number) => {
    setSelectedIcons((prev) =>
      prev.includes(id) ? prev.filter((iconId) => iconId !== id) : [...prev, id]
    );
  };

  // Filter icons based on search term
  const filteredIcons = icons
    .map((icon, index) => ({ ...icon, id: index })) // Add the original index as `id`
    .filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      {/* Selected Icons */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded border border-gray-300 w-full">
        {selectedIcons.length > 0 ? (
          selectedIcons.map((id) => {
            const { name, icon } = icons[id];
            return (
              <button
                key={id}
                onClick={() => toggleIcon(id)}
                className="flex items-center gap-2 p-2 px-4 border border-main-blue bg-main-blue text-white rounded-full transition-all hover:bg-red-500"
                title={`Remove ${name}`}
              >
                <div className="text-xl">{icon}</div>
                <small>{name}</small>
              </button>
            );
          })
        ) : (
          <p className="text-gray-500">No icons selected.</p>
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
      <div className="flex flex-row flex-wrap gap-2 w-full h-60 overflow-auto rounded bg-main-blue/10 p-2 border border-gray-300">
        {filteredIcons.length > 0 ? (
          filteredIcons.map(({ name, icon, id }) => (
            <button
              key={id}
              onClick={() => toggleIcon(id)}
              className={`flex flex-row gap-2 items-center justify-center p-2 px-4 h-fit w-fit rounded-full transition-all font-medium ${
                selectedIcons.includes(id)
                  ? "bg-main-blue text-white"
                  : "bg-white text-main-blue"
              } active:scale-95 border border-main-blue`}
              title={name}
            >
              <div
                className={`text-xl ${
                  selectedIcons.includes(id) ? "text-white" : "text-main-blue"
                }`}
              >
                {icon}
              </div>
              <small>{name}</small>
            </button>
          ))
        ) : (
          <p className="text-gray-500">No icons match your search.</p>
        )}
      </div>
    </div>
  );
};

export default ToolOrStackSelector;
