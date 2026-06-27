import fs from "fs";
import path from "path";

export type Locale = "zh" | "en";
export const LOCALES: Locale[] = ["zh", "en"];

const dir = path.join(process.cwd(), "messages");
const filePath = (locale: Locale) => path.join(dir, `${locale}.json`);

export function getMessages(locale: Locale): Record<string, any> {
  try {
    return JSON.parse(fs.readFileSync(filePath(locale), "utf8"));
  } catch (error) {
    console.error(`Error reading messages/${locale}.json:`, error);
    return {};
  }
}

export function getAllMessages(): Record<Locale, Record<string, any>> {
  return { zh: getMessages("zh"), en: getMessages("en") };
}

export function saveMessages(
  locale: Locale,
  data: unknown,
): boolean {
  try {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      return false;
    }
    fs.writeFileSync(
      filePath(locale),
      JSON.stringify(data, null, 2) + "\n",
      "utf8",
    );
    return true;
  } catch (error) {
    console.error(`Error saving messages/${locale}.json:`, error);
    return false;
  }
}
