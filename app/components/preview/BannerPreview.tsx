"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, resetFirstItemAndInitializeDB } from "@/lib/db";
import ClearDatabase from "../generate-section/ClearDatabase";
import Spinner from "../loaders/Spinner";
import Download from "@/svgs/Download.svg";
import { toolOptions } from "../static/stack-tools";
import { toPng } from "html-to-image";
import SmallSpinner from "../loaders/SmallSpinner";
import { Reorder } from "framer-motion";

export default function BannerPreview() {
  const data = useLiveQuery(() => db.banner.get(1));
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [items, setItems] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    // Cleanup database structure if needed
    async function cleanup() {
      if (data && (!data.tools?.tools || !data.background || !data.order)) {
        await resetFirstItemAndInitializeDB();
      }
    }

    cleanup();
  }, [data]);

  useEffect(() => {
    if (data?.order) {
      setItems(data.order);
    }
  }, [data?.order]);

  if (!data) {
    return (
      <div className="w-full aspect-[3/1] flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { title, description, tools, background, order } = data;

  // Match tools with icons
  const matchedTools = tools?.tools?.map((tool) => {
    const match = toolOptions.find(
      (item) => item.name.toLowerCase() === tool.toLowerCase()
    );
    return match || { name: tool, icon: null };
  });

  const renderSkills = () => {
    if (description.skills.length > 0) {
      const { skills, skillsSeperator } = description;
      return skillsSeperator ? skills.join(skillsSeperator) : skills.join(" ");
    }
    return "No skills selected";
  };

  const renderText = (
    text: string,
    color: string,
    font: string,
    fontWeight: number,
    fontSize: number,
    alignment: "left" | "center" | "right",
    italic: boolean
  ) => (
    <p
      className={`w-full ${font} ${
        alignment === "left"
          ? "text-left"
          : alignment === "right"
          ? "text-right"
          : "text-center"
      } ${italic ? "italic" : ""}`}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        color: color,
      }}
    >
      {text}
    </p>
  );

  const renderSection = (sectionId: number) => {
    switch (sectionId) {
      case 0:
        return renderText(
          title.text,
          title.color,
          title.font,
          title.fontWeight,
          title.fontSize,
          title.alignment,
          title.italic
        );
      case 1:
        return description.useDescription
          ? renderText(
              description.text,
              description.color,
              description.font,
              description.fontWeight,
              description.fontSize,
              description.alignment,
              description.italic
            )
          : renderText(
              renderSkills(),
              description.color,
              description.font,
              description.fontWeight,
              description.fontSize,
              description.alignment,
              description.italic
            );
      case 2:
        return (
          <p
            className={`w-full ${
              tools.alignment === "left"
                ? "text-left"
                : tools.alignment === "right"
                ? "text-right"
                : "text-center"
            }`}
            style={{
              fontSize: `${tools.fontSize}px`,
              color: tools.color,
            }}
          >
            {matchedTools?.length > 0 ? (
              matchedTools.map(({ name, icon }, id) => (
                <span key={id} title={name} className="inline-block mx-1">
                  {icon || "🛠"}
                </span>
              ))
            ) : (
              <></>
            )}
          </p>
        );
      default:
        return null;
    }
  };

  const handleDownload = async () => {
    if (bannerRef.current) {
      setIsGenerating(true);
      try {
        // To make sure fonts are loaded completely. LEAVE THIS AS IS!!
        const dataUr = await toPng(bannerRef.current, {
          quality: 1.0,
          pixelRatio: window.devicePixelRatio * 6,
        });
        const dataUrl = await toPng(bannerRef.current, {
          quality: 1.0,
          pixelRatio: window.devicePixelRatio * 6,
        });

        const link = document.createElement("a");
        link.download = "kl1n-banner.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleOrderChange = async (newOrder: number[]) => {
    if (data) {
      await db.banner.put({
        ...data,
        order: newOrder,
      });
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-2 items-center justify-center p-2 bg-main-blue/20">
      <div
        style={{
          background: background.useGradient
            ? background.gradientType === "radial"
              ? `radial-gradient(circle, ${background.gradientStart}, ${
                  background.gradientMiddle
                    ? background.gradientMiddle
                    : background.gradientStart
                }, ${background.gradientEnd})`
              : `linear-gradient(${background.gradientAngle}deg, ${
                  background.gradientStart
                }, ${
                  background.gradientMiddle
                    ? background.gradientMiddle
                    : background.gradientStart
                }, ${background.gradientEnd})`
            : background.color,
        }}
        ref={bannerRef}
        className="w-full aspect-[3/1] bg-white flex flex-col items-center justify-between font-bold p-2 md:p-4 overflow-hidden"
      >
        <Reorder.Group
          values={items}
          onReorder={(newOrder) => {
            setItems(newOrder);
            handleOrderChange(newOrder);
          }}
          axis="y"
          className="w-full h-full flex flex-col justify-between"
        >
          {items.map((section, id) => (
            <Reorder.Item
              key={section}
              value={section}
              className="w-full h-1/3 flex items-center justify-center cursor-move"
            >
              {renderSection(section)}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`flex flex-row gap-1 text-white items-center justify-center font-semibold bg-main-blue rounded w-32 h-10 shadow transition-all active:scale-95 disabled:opacity-70`}
        >
          {!isGenerating && <small>Download</small>}
          {isGenerating && <SmallSpinner isWhite />}
          {!isGenerating && <Download />}
        </button>
        <ClearDatabase />
      </div>
    </div>
  );
}
