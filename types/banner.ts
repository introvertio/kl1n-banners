export interface Title {
    text: string; 
    font: string; 
    fontWeight: number; 
    italic: boolean; 
    fontSize: number; 
    color: string;
    alignment: "left" | "center" | "right"; 
  }

export interface SkillSeperator{
    seperator:" , " | " - " | " / " | " | " | " ~ " | null ;  
}

export interface Description {
    useDescription: boolean;
    text: string; 
    skills : string[];
    skillsSeperator: " , " | " - " | " / " | " | " | " ~ " | null ;  
    font: string; 
    fontWeight: number; 
    italic: boolean; 
    fontSize: number; 
    color: string;
    alignment: "left" | "center" | "right";
  }

  export interface Tools {
    tools : string[];
    fontSize: number; 
    color: string;
    alignment: "left" | "center" | "right";
  }

export interface Background {
  useGradient: boolean;
  color: string;
  gradientStart: string;
  gradientMiddle: string | null;
  gradientEnd: string;
  gradientType: "linear" | "radial";
  gradientAngle: number;
}

export interface BannerData {
    id: number;
    order: number[];
    title: Title;
    description: Description;
    tools: Tools;
    background: Background;
  }
  