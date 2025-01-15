export interface Title {
    text: string; // Title text
    font: string; // Font class
    fontWeight: number; // Font weight (100-900)
    italic: boolean; // Italicized or not
    fontSize: number; // Font size in px
    color: string;
    alignment: "left" | "center" | "right"; // Text alignment
  }

  
export interface BannerData {
    id: number;
    title: Title;
    description: string;
    tools: string;
  }
  