import { program } from "commander";
import { createTemplate } from "./createTemplate.js";

program
	.version("1.0.0")
	.description("Create a new template file for Astro.js project");

program
	.option("-n, --name <name>", "Animation name")
	.option("-t, --tag <tag>", "Animation tag")
	.parse(process.argv);

const options = program.opts();

if (options.name) {
	createTemplate(options.name, options?.tag);
} else {
	console.error("Please provide a name using the -n or --name option");
	process.exit(1);
}
