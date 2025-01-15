import { cabinetFont } from "@/app/components/styling/font-classes";
import { BannerData, Title } from "@/types/banner";
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
  font: cabinetFont,
  fontWeight: 500,
  italic: false,
  fontSize: 24,
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
      description: "Default Description",
      tools: "Default Tools",
    });
  }
}
