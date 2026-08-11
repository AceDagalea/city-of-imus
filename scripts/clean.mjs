import { rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
for (const dir of [".next", join("node_modules", ".cache")]) {
  rmSync(join(root, dir), { recursive: true, force: true });
  console.log(`removed ${dir}`);
}
