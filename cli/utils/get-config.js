const fs = require("fs-extra");
const path = require("path");

async function getConfig() {
  const configPath = path.join(process.cwd(), "orzui.json");

  if (!fs.existsSync(configPath)) {
    return null;
  }

  return await fs.readJson(configPath);
}

module.exports = { getConfig };
