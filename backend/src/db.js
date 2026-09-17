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

export async function save(data, filename = USERS_FILE) {
  try {
    const dataString = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, dataString, "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}
