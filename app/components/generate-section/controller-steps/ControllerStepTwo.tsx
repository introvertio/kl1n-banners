import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import Spinner from "../../loaders/Spinner";
import SkillsSelector from "../selectors/SkillsSelector";
import SkillsSeparatorSelector from "../selectors/SkillsSeperatorSelector";
import ItalicSelector from "../selectors/ItalicSelector";
import AlignSelector from "../selectors/AlignSelector";
import FontWeightSelector from "../selectors/FontWeightSelector";
import FontSizeSelectorTwo from "../selectors/FontSizeSelectorTwo";

export default function ControllerStepTwo() {
  const data = useLiveQuery(() => db.banner.get(1), []);

  const handleChange = async (
    key: string,
    value: string | number | boolean | string[] | null
  ) => {
    if (data) {
      await db.banner.put({
        ...data,
        description: {
          ...data.description,
          [key]: value,
        },
      });
    }
  };

  const handleSkillToggle = (skill: string): void => {
    if (data) {
      const { description } = data;
      const updatedSkills = description.skills.includes(skill)
        ? description.skills.filter((item) => item !== skill)
        : [...description.skills, skill];

      handleChange("skills", updatedSkills);
    }
  };

  const handleSeparatorChange = (
    separator: " , " | " - " | " / " | " | " | " ~ " | null
  ) => {
    handleChange("skillsSeperator", separator);
  };

  if (!data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { description } = data;

  const skills = [
    "Software Engineer",
    "UI/UX Designer",
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
  ];

  const separators = [" , ", " - ", " / ", " | ", " ~ ", null] as const;

  return (
    <div className="w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-1 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-extrabold rounded">
          Description / Skills
        </p>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <div className="flex flex-row gap-2 w-full items-center justify-between">
            <p className="md:text-lg font-bold">Description</p>
            <button
              onClick={() => handleChange("useDescription", true)}
              className={`${
                !description.useDescription
                  ? `bg-white text-black`
                  : `bg-main-blue text-white`
              } h-9 w-40 rounded shadow transition-all active:scale-95 text-sm font-bold`}
            >
              Use Description
            </button>
          </div>
          {description.useDescription && (
            <textarea
              className="shadow w-full rounded p-2 outline-none focus:ring-2 focus:ring-main-blue transition-all font-bold"
              maxLength={100}
              onChange={(e) => handleChange("text", e.target.value)}
              value={description.text}
            />
          )}
        </div>
        <small className="text-xs font-bold text-main-blue mx-auto">{`- or -`}</small>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <div className="flex flex-row gap-2 w-full items-center justify-between">
            <p className="md:text-lg font-bold">Skills</p>
            <button
              onClick={() => handleChange("useDescription", false)}
              className={`${
                description.useDescription
                  ? `bg-white text-black`
                  : `bg-main-blue text-white`
              } h-9 w-40 rounded shadow transition-all active:scale-95 text-sm font-bold`}
            >
              Use Skills
            </button>
          </div>
          {!description.useDescription && (
            <>
              <SkillsSelector
                skills={skills}
                selectedSkills={description.skills}
                onToggle={handleSkillToggle}
              />
              <SkillsSeparatorSelector
                separators={[...separators]}
                selectedSeparator={description.skillsSeperator}
                onChange={handleSeparatorChange}
                font={description.font}
              />
            </>
          )}
        </div>
        <div className="flex flex-row gap-1 items-end justify-between">
          <ItalicSelector
            isItalic={description.italic}
            weight={description.fontWeight}
            font={description.font}
            onChange={(value) => handleChange("italic", value)}
          />
          <AlignSelector
            alignment={description.alignment}
            onChange={(value) => handleChange("alignment", value)}
          />
        </div>
        <FontWeightSelector
          font={description.font}
          weight={description.fontWeight}
          onChange={(value) => handleChange("fontWeight", value)}
        />
        <FontSizeSelectorTwo
          size={description.fontSize}
          onChange={(value) => handleChange("fontSize", value)}
        />
        <div className="relative flex flex-col w-full h-full">
          <p className="text-black font-bold text-xs mr-auto">Text color</p>
          <input
            className="w-full h-10 outline-none rounded active:scale-95 transition-all shadow "
            type="color"
            value={description.color}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
