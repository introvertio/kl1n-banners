import React, { useState, useEffect } from "react";
import Spinner from "../loaders/Spinner";
import { BannerData } from "@/types/banner";
import { generateRandomBannerData } from "./generator/DynamicHeroBanners";
import { toolOptions } from "../static/stack-tools";
import { Reorder } from "framer-motion";

interface Brand {
  font: string;
  value: string;
  font_size: number;
  font_weight: number;
  alignment: "left" | "center" | "right";
}

interface SkillsRDescription {
  font: string;
  value: string | [string];
  font_size: number;
  font_weight: number;
  alignment: "left" | "center" | "right";
}

export default function DynamicBannerNSkills() {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only run interval when component is visible
    if (!isVisible) return;

    const interval = setInterval(() => {
      setBannerData(generateRandomBannerData(Math.random()));
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!bannerData) {
    return (
      <div className="w-full max-w-2xl flex flex-col gap-6 items-center justify-center">
        <div className="w-full aspect-[3/1] flex items-center justify-center">
          <Spinner isWhite />
        </div>
      </div>
    );
  }

  const { title, description, tools, background, order } = bannerData;

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
      } ${italic ? "italic" : ""} transition-all`}
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
            } transition-all`}
            style={{
              fontSize: `${tools.fontSize}px`,
              color: tools.color,
            }}
          >
            {matchedTools?.length > 0 ? (
              matchedTools.map(({ name, icon }, id) => (
                <span key={id} title={name} className="inline-block mx-1">
                  {icon}
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

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl h-fit flex flex-col gap-2 items-center justify-center p-2 bg-main-blue/20"
    >
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
        className="w-full aspect-[3/1] bg-white flex flex-col items-center justify-between font-bold p-2 md:p-4 overflow-hidden transition-all"
      >
        <Reorder.Group
          values={order}
          onReorder={console.log}
          axis="y"
          className="w-full h-full flex flex-col justify-between"
        >
          {order.map((section, id) => (
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
      <h2 className={`text-5xl md:text-8xl font-black text-white`}>
        DEVELOPERS
      </h2>
    </div>
  );
}
