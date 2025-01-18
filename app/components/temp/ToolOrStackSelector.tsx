import React, { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaAngular,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiKubernetes,
  SiMongodb,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import { tools } from "../static/stack-tools";

const ToolOrStackSelector: React.FC = () => {
  // Predefined icons
  const icons = tools;

  // State for color and selected icons
  const [color, setColor] = useState<string>("#000000");
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);

  // Toggle icon selection
  const toggleIcon = (id: number) => {
    setSelectedIcons((prev) =>
      prev.includes(id) ? prev.filter((iconId) => iconId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full p-4 space-y-4">
      {/* Color Picker */}
      <div className="flex items-center gap-4">
        <label htmlFor="colorPicker" className="font-medium text-gray-700">
          Select Icon Color:
        </label>
        <input
          id="colorPicker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-12 border rounded"
        />
      </div>

      {/* Icons Grid */}
      <div className="flex flex-row gap-1 flex-wrap">
        {icons.map(({ name, icon }, id) => (
          <button
            key={id}
            onClick={() => toggleIcon(id)}
            className={`flex flex-row gap-1 items-center justify-center p-2 border rounded-lg transition-all ${
              selectedIcons.includes(id)
                ? "bg-main-blue text-white border-main-blue"
                : "bg-white text-gray-700 border-gray-300"
            } active:scale-95`}
            title={name}
          >
            <div
              className=" text-[20px] "
              style={{
                color: selectedIcons.includes(id) ? "#ffffff" : "#000000",
              }}
            >
              {icon}
            </div>
            <span className="mt-2 text-sm">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolOrStackSelector;
