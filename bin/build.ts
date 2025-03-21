
import fs from "node:fs";
import path from "node:path";
import fsExtra from "fs-extra/esm";
import { spawn, spawnSync } from "node:child_process";

const rootPath = path.resolve(process.cwd());
const serverPath = path.resolve(rootPath, "src", "server");
const webPath = path.resolve(rootPath, "src", "web");
// 打包doc
spawnSync("npm run", ["--prefix", webPath, "build"], {
  stdio: "inherit",
  shell: true,
});
// 移动打包后的文件到server目录下
fsExtra.moveSync(path.join(webPath, 'dist'), path.join(serverPath, 'www'), { overwrite: true });
