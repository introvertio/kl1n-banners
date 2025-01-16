import React, { useState } from "react";

const FileSelector: React.FC = () => {
  const [files] = useState<string[]>([
    "File1.txt",
    "File2.docx",
    "File3.pdf",
    "File4.png",
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
    <div className=" flex flex-col gap-1">
      <div className="flex flex-wrap gap-1">
        {files.map((file) => (
          <button
            key={file}
            onClick={() => handleFileToggle(file)}
            className={`p-1 px-4 text-xm rounded-full border ${
              selectedFiles.includes(file)
                ? "bg-green-500 text-white border-green-500"
                : "bg-gray-100 text-black border-gray-300"
            } hover:shadow-md`}
          >
            {file}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-1 w-full">
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
