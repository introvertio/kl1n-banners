import React from "react";
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
  return (
    <div className="flex flex-row flex-wrap gap-1 w-full h-28 overflow-auto rounded bg-main-blue/10 p-1">
      {skills.map((skill) => (
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
    </div>
  );
};

export default SkillsSelector;
