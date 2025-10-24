#!/usr/bin/env node

const { Command } = require("commander");
const path = require("path");
const fs = require("fs");

// Read package.json
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const program = new Command();

program
  .name("@orz14/orzui")
  .description("CLI to add OrzUI components to your project")
  .version(packageJson.version)
  .addHelpText(
    "after",
    `
Example usage:
  $ npx @orz14/orzui init
  $ npx @orz14/orzui add button
  $ npx @orz14/orzui add --all

Or install globally:
  $ npm install -g @orz14/orzui
  $ orzui init
  $ orzui add button
  `
  );

program
  .command("init")
  .description("Initialize OrzUI in your project")
  .action(async () => {
    const { runInit } = require("./commands/init");
    await runInit();
  });

program
  .command("add [components...]")
  .description("Add components to your project")
  .option("-a, --all", "Add all components")
  .option("-o, --overwrite", "Overwrite existing components")
  .addHelpText(
    "after",
    `
Available components:
  button, card, input, badge, alert, avatar

Examples:
  $ npx @orz14/orzui add button
  $ npx @orz14/orzui add --all
  $ npx @orz14/orzui add button --overwrite
  `
  )
  .action(async (components, options) => {
    const { runAdd } = require("./commands/add");
    await runAdd(components, options);
  });

program.parse(process.argv);

// Show help if no command
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
