import { cabinetFont, poppinsFont } from "@/app/components/styling/font-classes";
import { BannerData, Description, Title, Tools } from "@/types/banner";
import Dexie, { Table } from "dexie";

class BannerDB extends Dexie {
  banner!: Table<BannerData, number>; // Table schema

  constructor() {
    super("BannerDB");
    this.version(1).stores({
      banner: "id, title, description, tools", // Indexed fields
    });
  }
}

export const db = new BannerDB();

const defaultTitle: Title = {
  text: "Default Title",
  font: poppinsFont,
  fontWeight: 500,
  italic: false,
  fontSize: 24,
  color: "#000000",
  alignment: "center",
};

const defaultDescription: Description = {
  useDescription: true,
  text: "Default Description",
  skills: [],
  skillsSeperator: " , ",
  font: poppinsFont,
  fontWeight: 500,
  italic: false,
  fontSize: 16,
  color: "#000000",
  alignment: "center",
};

const defaultTools: Tools = {
    tools: ["Typescript"],
    fontSize: 16,
    color: "#000000",
    alignment: "center",
  };

// Initialize default data if it doesn't exist
export async function initializeDB(): Promise<void> {
  const existing = await db.banner.get(1);
  if (!existing) {
    await db.banner.put({
      id: 1,
      title: defaultTitle,
      description: defaultDescription,
      tools: defaultTools,
    });
  }
}

// Function to delete the first item and reinitialize the database
export async function resetFirstItemAndInitializeDB(): Promise<void> {
  try {
    const firstItem = await db.banner.get(1);
    if (firstItem) {
      await db.banner.delete(firstItem.id);
    }
    await initializeDB();
  } catch (error) {
    console.error("Error resetting the database:", error);
    throw new Error("Failed to reset the database.");
  }
}
