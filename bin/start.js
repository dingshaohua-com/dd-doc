import path from "node:path";
import { spawn } from "node:child_process";

const srcDir = path.resolve("src");
const serverPath = path.join(srcDir, "server");
spawn("npm run", ["--prefix", serverPath, "dev"], {
  stdio: "inherit",
  shell: true,
});