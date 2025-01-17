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

const ToolOrStackSelector: React.FC = () => {
  // Predefined icons
  const icons = [
    { id: 1, name: "React", icon: <FaReact /> },
    { id: 2, name: "Node.js", icon: <FaNodeJs /> },
    { id: 3, name: "Python", icon: <FaPython /> },
    { id: 4, name: "Java", icon: <FaJava /> },
    { id: 5, name: "Angular", icon: <FaAngular /> },
    { id: 6, name: "Docker", icon: <FaDocker /> },
    { id: 7, name: "TypeScript", icon: <SiTypescript /> },
    { id: 8, name: "Kubernetes", icon: <SiKubernetes /> },
    { id: 9, name: "MongoDB", icon: <SiMongodb /> },
    { id: 10, name: "PostgreSQL", icon: <SiPostgresql /> },
    { id: 11, name: "Git", icon: <SiGit /> },
  ];

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
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {icons.map(({ id, name, icon }) => (
          <button
            key={id}
            onClick={() => toggleIcon(id)}
            className={`flex flex-col items-center justify-center p-2 border rounded-lg transition-all ${
              selectedIcons.includes(id)
                ? "bg-main-blue text-white border-main-blue"
                : "bg-white text-gray-700 border-gray-300"
            } active:scale-95`}
            title={name}
          >
            <div
              style={{
                color: selectedIcons.includes(id) ? "#fff" : color,
                fontSize: "2rem",
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
