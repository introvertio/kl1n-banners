import { Background, BannerData, Description, Tools, Title } from "@/types/banner";
import { skills } from "../../static/skiils";
import { skills as Skills } from "../../static/skiils";
import { toolOptions } from "../../static/stack-tools";


function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomColor(): string {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  return randomColor;
}

function generateRandomOrder(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function getRandomSkillsCount(min: number = 1, max?: number): number {
  if (max === undefined) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTitle(): Title {
  return {
    text: getRandomElement(["by Oyindamola", "Oyindamola", "by oyindamola", "Damola"]),
    font: getRandomElement(["Poppins", "Bespoke", "Supreme", "Cabinet", "Chillax", "Satoshi", "Excon"]),
    fontWeight: getRandomElement([300, 500, 700, 900]),
    italic: Math.random() > 0.5,
    fontSize: getRandomElement([24, 28, 32, 36]),
    color: generateRandomColor(),
    alignment: getRandomElement(["left", "center", "right"]),
  };
}

function generateRandomDescription(): Description {
  const minSkills = 1;
  const maxSkills = 3; // You can adjust these values as needed
  const skillsCount = getRandomSkillsCount(minSkills, maxSkills);
  
  return {
    useDescription: Math.random() > 0.5,
    text: getRandomElement(["WEB DEV", "FULL STACK DEV", "BACKEND DEV", "FRONTEND DEV", "SOFTWARE DESIGNER", "DEVELOPER", "SOFTWARE ENGINEER", "DESIGN ENGINEER", "DESIGNER", "DEVELOPER", "DESIGNER", "DEVELOPER"]),
    skills: Array.from({ length: skillsCount }, () => getRandomElement(Skills)),
    skillsSeperator: getRandomElement([" , ", " - ", " / ", " | ", " ~ ", null]),
    font: getRandomElement(["Montserrat", "Arial", "Roboto", "Lato"]),
    fontWeight: getRandomElement([300, 500, 700, 900]),
    italic: Math.random() > 0.5,
    fontSize: getRandomElement([20, 22, 24, 26]),
    color: generateRandomColor(),
    alignment: getRandomElement(["left", "center", "right"]),
  };
}

function generateRandomTools(): Tools {
  return {
    tools: [getRandomElement(toolOptions.map((item) => item.name))],
    fontSize: getRandomElement([14, 16, 18, 20]),
    color: generateRandomColor(),
    alignment: getRandomElement(["left", "center", "right"]),
  };
}

function generateRandomBackground(): Background {
  const useGradient = Math.random() > 0.5;
  return {
    useGradient,
    color: useGradient ? "" : generateRandomColor(),
    gradientStart: useGradient ? generateRandomColor() : "",
    gradientMiddle: useGradient ? generateRandomColor() : null,
    gradientEnd: useGradient ? generateRandomColor() : "",
    gradientType: getRandomElement(["linear", "radial"]),
    gradientAngle: useGradient ? getRandomElement([0, 45, 90, 135, 180]) : 0,
  };
}

export function generateRandomBannerData(id: number): BannerData {
  return {
    id,
    order: generateRandomOrder(3),
    title: generateRandomTitle(),
    description: generateRandomDescription(),
    tools: generateRandomTools(),
    background: generateRandomBackground(),
  };
}

// Example usage:
const randomBanner = generateRandomBannerData(2);
