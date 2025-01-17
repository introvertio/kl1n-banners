import React, { useState } from "react";
import Add from "@/svgs/Add.svg";
import Remove from "@/svgs/Remove.svg";

interface SkillsSelectorProps {
  skills: string[];
  selectedSkills: string[];
  onToggle: (skill: string) => void;
}

const SkillsSelector: React.FC<SkillsSelectorProps> = ({
  skills,
  selectedSkills,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter skills based on the search term
  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-2">
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search skills..."
        className="w-full h-10 shadow p-2 text-sm rounded outline-none focus:ring-2 focus:ring-main-blue transition-all"
      />

      {/* Skills List */}
      <div className="flex flex-row flex-wrap gap-1 w-full h-28 overflow-auto rounded bg-main-blue/10 p-1">
        {filteredSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => onToggle(skill)}
            className={`flex flex-row gap-1 items-center justify-center p-1 h-fit px-3 rounded-full border font-medium ${
              selectedSkills.includes(skill)
                ? "bg-main-blue text-white border-main-blue"
                : "bg-white text-main-blue border-main-blue"
            } transition-all active:scale-95`}
          >
            <small>{skill}</small>
            {selectedSkills.includes(skill) ? (
              <Remove className={`scale-75`} />
            ) : (
              <Add className={`scale-75`} />
            )}
          </button>
        ))}
        {/* No Results Message */}
        {filteredSkills.length === 0 && (
          <p className="w-full text-center text-gray-500">
            No skills match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsSelector;
