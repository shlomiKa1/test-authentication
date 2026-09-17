import fs from "fs/promises";
import path from "path";
import { USERS_FILE } from "./config.js";

export async function load(filename = USERS_FILE) {
  //   if (!fs.(filename)) {
  //     await fs.appendFile(filename, "[]", "utf-8");
  //     return [];
  //   }

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
