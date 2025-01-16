export interface Title {
    text: string; 
    font: string; 
    fontWeight: number; 
    italic: boolean; 
    fontSize: number; 
    color: string;
    alignment: "left" | "center" | "right"; 
  }


export interface Description {
    useDescription: boolean;
    text: string; 
    skills : string[];
    skillsSeperator: ", " | " - " | " / " | " | " | " ~ " | null ;  
    font: string; 
    fontWeight: number; 
    italic: boolean; 
    fontSize: number; 
    color: string;
    alignment: "left" | "center" | "right";
  }

export interface BannerData {
    id: number;
    title: Title;
    description: Description;
    tools: string;
  }
  