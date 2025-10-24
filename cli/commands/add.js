const fs = require("fs-extra");
const path = require("path");
const prompts = require("prompts");
const ora = require("ora");
const { getConfig } = require("../utils/get-config");
const { getComponentTemplate } = require("../utils/templates");

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

const AVAILABLE_COMPONENTS = ["button", "card", "input", "badge", "alert", "avatar"];

async function runAdd(components, options) {
  // Load config
  const config = await getConfig();
  if (!config) {
    console.log("");
    console.log(colors.red("✗ OrzUI is not initialized."));
    console.log("");
    console.log(colors.cyan("Run the following command to initialize:"));
    console.log(colors.white("  npx @orz14/orzui init"));
    console.log("");
    return;
  }

  let selectedComponents = components;

  // If --all flag
  if (options.all) {
    selectedComponents = AVAILABLE_COMPONENTS;
  }

  // If no components selected, show prompt
  if (!selectedComponents || selectedComponents.length === 0) {
    const answers = await prompts({
      type: "multiselect",
      name: "components",
      message: "Select components to add:",
      choices: AVAILABLE_COMPONENTS.map((comp) => ({
        title: comp,
        value: comp,
        selected: false,
      })),
      min: 1,
      hint: "- Space to select. Return to submit",
    });

    if (!answers.components || answers.components.length === 0) {
      console.log(colors.yellow("No components selected."));
      return;
    }

    selectedComponents = answers.components;
  }

  // Validate components
  const invalidComponents = selectedComponents.filter((comp) => !AVAILABLE_COMPONENTS.includes(comp));

  if (invalidComponents.length > 0) {
    console.log("");
    console.log(colors.red(`✗ Components not available: ${invalidComponents.join(", ")}`));
    console.log("");
    console.log(colors.cyan("Available components:"));
    console.log(colors.white(`  ${AVAILABLE_COMPONENTS.join(", ")}`));
    console.log("");
    return;
  }

  const spinner = ora("Adding components...").start();

  try {
    const componentsDir = path.join(process.cwd(), config.componentsPath);
    await fs.ensureDir(componentsDir);

    const addedComponents = [];
    const skippedComponents = [];

    for (const component of selectedComponents) {
      const ext = config.typescript ? "tsx" : "jsx";
      const componentPath = path.join(componentsDir, `${component}.${ext}`);

      // Check if file already exists
      if (fs.existsSync(componentPath) && !options.overwrite) {
        skippedComponents.push(component);
        continue;
      }

      // Get template
      const template = getComponentTemplate(component, config);
      await fs.writeFile(componentPath, template);
      addedComponents.push(component);

      spinner.text = `Adding ${component}...`;
    }

    spinner.stop();

    // Show results
    console.log("");

    if (addedComponents.length > 0) {
      console.log(colors.green(`✓ Successfully added ${addedComponents.length} component${addedComponents.length > 1 ? "s" : ""}:`));
      addedComponents.forEach((comp) => {
        const ext = config.typescript ? "tsx" : "jsx";
        console.log(colors.white(`  • ${comp}.${ext}`));
      });
    }

    if (skippedComponents.length > 0) {
      console.log("");
      console.log(colors.yellow(`⚠ ${skippedComponents.length} component${skippedComponents.length > 1 ? "s" : ""} skipped (already exists):`));
      skippedComponents.forEach((comp) => {
        const ext = config.typescript ? "tsx" : "jsx";
        console.log(colors.dim(`  • ${comp}.${ext}`));
      });
      console.log("");
      console.log(colors.dim("  Use --overwrite to overwrite existing components:"));
      console.log(colors.white(`  npx @orz14/orzui add ${skippedComponents.join(" ")} --overwrite`));
    }

    console.log("");
    console.log(colors.cyan("📁 Component location:"));
    console.log(colors.white(`   ${config.componentsPath}`));
    console.log("");

    console.log(colors.cyan("💡 Usage:"));
    console.log(colors.white(`   import { Button } from '@/components/orzui/button'`));
    console.log("");

    if (addedComponents.length > 0) {
      console.log(colors.cyan("📚 Add more components:"));
      console.log(colors.white("   npx @orz14/orzui add card input"));
      console.log(colors.dim("   or"));
      console.log(colors.white("   npx @orz14/orzui add --all"));
      console.log("");
    }
  } catch (error) {
    spinner.fail(colors.red("✗ Failed to add components."));
    console.error(error);
    process.exit(1);
  }
}

module.exports = { runAdd };
