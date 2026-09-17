import fs from "fs/promises";
import { USERS_FILE } from "./config";
import path from "path";

export async function load(filename = USERS_FILE) {
  try {
    const data = await fs.readFile(filename, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
