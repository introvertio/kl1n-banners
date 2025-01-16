import React, { useState } from "react";
import Add from "@/svgs/Add.svg";
import Remove from "@/svgs/Remove.svg";

const FileSelector: React.FC = () => {
  const [files] = useState<string[]>([
    "Software Engineer",
    "UI/UX Designer",
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Devops Engineer",
  ]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileToggle = (fileName: string): void => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileName)) {
        // Remove file if already selected
        return prevSelected.filter((file) => file !== fileName);
      } else {
        // Add file if not selected
        return [...prevSelected, fileName];
      }
    });
  };

  return (
    <div className=" flex flex-col gap-1 w-full">
      <div className="flex flex-row flex-wrap gap-1 w-full h-28 items-center justify-center overflow-auto rounded bg-gray-200 p-1">
        {files.map((file) => (
          <button
            key={file}
            onClick={() => handleFileToggle(file)}
            className={`flex flex-row gap-1 items-center justify-center p-1 h-fit px-3 rounded-full border font-bold ${
              selectedFiles.includes(file)
                ? "bg-main-blue text-white border-main-blue"
                : "bg-white text-main-blue border-main-blue"
            } transition-all active:scale-95`}
          >
            <small>{file}</small>
            {selectedFiles.includes(file) ? (
              <Remove className={`scale-75`} />
            ) : (
              <Add className={`scale-75`} />
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-row flex-wrap gap-1 w-full">
        {selectedFiles.length > 0 ? (
          selectedFiles.map((file) => <p key={file}>{file}</p>)
        ) : (
          <p className="text-gray-500">No files selected</p>
        )}
      </div>
    </div>
  );
};

export default FileSelector;
