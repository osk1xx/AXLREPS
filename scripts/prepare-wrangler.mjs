import { readFile, writeFile } from "node:fs/promises";

const configPath = new URL("../.output/server/wrangler.json", import.meta.url);
const config = JSON.parse(await readFile(configPath, "utf8"));

// Preserve variables and secrets configured in the Cloudflare dashboard.
config.keep_vars = true;

await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
