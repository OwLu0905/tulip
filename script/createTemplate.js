import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import { program } from "commander"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createTemplate() {
	const projectRoot = path.join(__dirname, "..");
	const templateDir = path.join(projectRoot, 'templates');
	const srcDir = path.join(projectRoot, 'src');

	const mdxsDir = path.join(srcDir, 'content/animation/');
	const animationsDir = path.join(srcDir, 'animations');

	// TODO: get file length based on mdx
	try {
		const files = await fs.readdir(mdxsDir)
		const idx = files.length

		const templateAnimationDir = path.join(templateDir, 'animation');
		const templateMdxDir = path.join(templateDir, 'mdx');

		const animationTargetDir = path.join(animationsDir, `animation${idx + 1}`)
		await createFolder(animationTargetDir)


		await writeContents(templateAnimationDir, animationTargetDir, undefined, "Hello Title", idx + 1)

		const mdxTargetName = `post-${idx + 1}.mdx`
		await writeContents(templateMdxDir, mdxsDir, mdxTargetName, "Hello Mdx Title", idx + 1)


	} catch (error) {
		console.log(error)
	}
}

async function createFolder(folderPath) {

	try {
		await fs.mkdir(folderPath, { recursive: true })
		console.log(`Folder created successfully at ${folderPath}`);
	} catch (error) {

		console.error('Error creating Folder :', error);
	}
}

async function createFile(filePath, content = '') {
	try {
		await fs.writeFile(filePath, content);
		console.log(`File created successfully at ${filePath}`);
	} catch (error) {
		console.error('Error creating file:', error);
	}
}

async function readFileContent(filePath) {
	try {
		const content = await fs.readFile(filePath, 'utf8');
		console.log('File content:', content);
		return content;
	} catch (error) {
		console.error('Error reading file:', error);
	}
}

async function writeContents(dir, target, targetName, title, slug) {

	const tempFiles = await fs.readdir(dir);
	const promises = tempFiles.map(filename => {
		const dest = path.join(dir, filename)
		return readFileContent(dest)
	})

	const result = await Promise.all(promises)
	const contents = result.flat()

	const writePromise = tempFiles.map((filename, index) => {

		const dest = path.join(target, targetName ?? filename)
		let content = contents[index]
		content = content.replaceAll("{{number}}", slug)
		content = content.replaceAll("{{title}}", title)
		return createFile(dest, content)
	})

	await Promise.all(writePromise)
}


program
	.version('1.0.0')
	.description('Create a new template file for Astro.js project');

program.action(() => {
	createTemplate()
})

program.parse(process.argv);
