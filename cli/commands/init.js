const fs = require("fs-extra");
const path = require("path");
const prompts = require("prompts");
const ora = require("ora");

// Simple color helpers
const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  white: (text) => `\x1b[37m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`,
};

async function runInit() {
  console.log(colors.bold(colors.blue("\n🎨 OrzUI Initialization\n")));

  // Check if configuration already exists
  const configPath = path.join(process.cwd(), "orzui.json");
  if (fs.existsSync(configPath)) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Configuration already exists. Overwrite?",
      initial: false,
    });

    if (!overwrite) {
      console.log(colors.yellow("Initialization cancelled."));
      return;
    }
  }

  // Ask user preferences
  const answers = await prompts([
    {
      type: "text",
      name: "componentsPath",
      message: "Where would you like to save your components?",
      initial: "src/components/orzui",
    },
    {
      type: "text",
      name: "utilsPath",
      message: "Where would you like to save your utilities?",
      initial: "src/lib",
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Are you using TypeScript?",
      initial: true,
    },
    {
      type: "select",
      name: "style",
      message: "Choose your style preference:",
      choices: [
        { title: "Default", value: "default" },
        { title: "New York", value: "new-york" },
      ],
      initial: 0,
    },
  ]);

  if (!answers.componentsPath) {
    console.log(colors.red("Initialization cancelled."));
    return;
  }

  const spinner = ora("Setting up OrzUI...").start();

  try {
    // Create components folder
    const componentsDir = path.join(process.cwd(), answers.componentsPath);
    await fs.ensureDir(componentsDir);

    // Create utils folder
    const utilsDir = path.join(process.cwd(), answers.utilsPath);
    await fs.ensureDir(utilsDir);

    // Create utility files
    const ext = answers.typescript ? "ts" : "js";
    const cnUtilPath = path.join(utilsDir, `cn.${ext}`);

    const cnContent = answers.typescript
      ? `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`
      : `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}`;

    await fs.writeFile(cnUtilPath, cnContent);

    // Save configuration
    const config = {
      $schema: "https://orzui.dev/schema.json",
      style: answers.style,
      typescript: answers.typescript,
      componentsPath: answers.componentsPath,
      utilsPath: answers.utilsPath,
    };

    await fs.writeJson(configPath, config, { spaces: 2 });

    // Update package.json with dependencies
    const packageJsonPath = path.join(process.cwd(), "package.json");

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);

      packageJson.dependencies = {
        ...packageJson.dependencies,
        clsx: "^2.1.0",
        "tailwind-merge": "^2.2.0",
      };

      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    spinner.succeed(colors.green("✓ OrzUI initialized successfully!"));

    // Success message with instructions
    console.log("");
    console.log(colors.bold("Next steps:"));
    console.log("");

    console.log(colors.cyan("  1. Install dependencies:"));
    console.log(colors.white("     npm install"));
    console.log("");

    console.log(colors.cyan("  2. Add components:"));
    console.log(colors.white("     npx @orz14/orzui add button"));
    console.log(colors.dim("     or"));
    console.log(colors.white("     npx @orz14/orzui add --all"));
    console.log("");

    console.log(colors.cyan("  3. (Optional) Install globally for shorter commands:"));
    console.log(colors.white("     npm install -g @orz14/orzui"));
    console.log(colors.dim("     Then you can use: orzui add button"));
    console.log("");
  } catch (error) {
    spinner.fail(colors.red("✗ Initialization failed."));
    console.error(error);
    process.exit(1);
  }
}

module.exports = { runInit };
