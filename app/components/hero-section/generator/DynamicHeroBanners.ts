import { Background, BannerData, Description, Tools, Title } from "@/types/banner";


interface colorPalette {
    primary: string[];
    secondary: string[];
}

const PaletteFirst: colorPalette = {
    primary: ["#222831", "#393E46"],
    secondary: ["#00ADB5", "#EEEEEE"],
}
const PaletteSecond: colorPalette = {
    primary: ["#71C9CE","#A6E3E9"],
    secondary: ["#CBF1F5", "#E3FDFD"],
}
const PaletteThird: colorPalette = {
    primary: ["#F9F7F7", "#DBE2EF"],
    secondary: ["#112D4E", "#3F72AF"],
}
const PaletteFourth: colorPalette = {
    primary: ["#FF9494", "#FFD1D1"],
    secondary: ["#FFF5E4", "#FFE3E1"],
}
const PaletteFifth: colorPalette = {
    primary: ["#F38181", "#FCE38A"],
    secondary: ["#EAFFD0", "#95E1D3"],
}
const PaletteSixth: colorPalette = {
    primary: ["#6A2C70", "#B83B5E"],
    secondary: ["#F08A5D", "#F9ED69"],
}
const PaletteSeventh: colorPalette = {
    primary: ["#FF2E63", "#252A34"],
    secondary: ["#08D9D6", "#EAEAEA"],
}
const PaletteEighth: colorPalette = {
    primary: ["#A8D8EA", "#AA96DA"],
    secondary: ["#FCBAD3", "#FFFFD2"],
}
const PaletteNinth: colorPalette = {
    primary: ["#45474B", "#495E57"],
    secondary: ["#F4CE14", "#F5F7F8"],
}
const PaletteTenth: colorPalette = {
    primary: ["#222831", "#393E46"],
    secondary: ["#FFD369", "#EEEEEE"],
}



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

function getRandomPalette(): colorPalette {
  const palettes = [
    PaletteFirst,
    PaletteSecond,
    PaletteThird,
    PaletteFourth,
    PaletteFifth,
    PaletteSixth,
    PaletteSeventh,
    PaletteEighth,
    PaletteNinth,
    PaletteTenth
  ];
  return getRandomElement(palettes);
}

function generateRandomTitle(): Title {
  const palette = getRandomPalette();
  const usePrimary = Math.random() > 0.5;
  const colors = usePrimary ? palette.primary : palette.secondary;
  
  return {
    text: getRandomElement(["by Oyindamola"]),
    font: getRandomElement(["font-[Poppins]", "font-[BespokeStencil-Variable]", "font-[Supreme-Variable]", "font-[CabinetGrotesk-Variable]", 
        "font-[Chillax-Variable]", "font-[Satoshi-Variable]", "font-[Excon-Variable]"]),
    fontWeight: getRandomElement([700, 900]),
    italic: Math.random() > 0.5,
    fontSize: getRandomElement([34, 38, 42, 46]),
    color: getRandomElement(colors),
    alignment: getRandomElement(["left", "center", "right"]),
  };
}

function generateRandomDescription(): Description {
  const palette = getRandomPalette();
  const usePrimary = Math.random() > 0.5;
  const colors = usePrimary ? palette.primary : palette.secondary;
  
  return {
    useDescription: Math.random() > 0.5,
    text: getRandomElement(["I Build Software", "I Engineer Software", "I Design Software"]),
    skills: ["Software Engineer", "Fullstack Developer"],
    skillsSeperator: getRandomElement([" , ", " - ", " / ", " | ", " ~ "]),
    font: getRandomElement(["font-[Poppins]", "font-[BespokeStencil-Variable]", "font-[Supreme-Variable]", "font-[CabinetGrotesk-Variable]", 
        "font-[Chillax-Variable]", "font-[Satoshi-Variable]", "font-[Excon-Variable]"]),
    fontWeight: getRandomElement([500, 700]),
    italic: Math.random() > 0.5,
    fontSize: getRandomElement([18, 22, 26, 30]),
    color: getRandomElement(colors),
    alignment: getRandomElement(["left", "center", "right"]),
  };
}

function generateRandomTools(): Tools {
  const palette = getRandomPalette();
  const usePrimary = Math.random() > 0.5;
  const colors = usePrimary ? palette.primary : palette.secondary;

  return {
    tools: ["Typescript", "Python", "React", "Next.js", "Tailwind CSS", "Django", "FastAPI", "MongoDB", "Supabase"],
    fontSize: getRandomElement([16, 20, 24, 28]),
    color: getRandomElement(colors),
    alignment: getRandomElement(["left", "center", "right"]),
  };
}

function generateRandomBackground(): Background {
  const palette = getRandomPalette();
  const useGradient = Math.random() > 0.5;
  const colors = useGradient ? palette.primary : palette.secondary;
  
  return {
    useGradient,
    color: useGradient ? "" : getRandomElement(colors),
    gradientStart: useGradient ? getRandomElement(colors) : "",
    gradientMiddle: useGradient ? getRandomElement(colors) : null,
    gradientEnd: useGradient ? getRandomElement(colors) : "",
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
