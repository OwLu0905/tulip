import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a template with the given title.
 *
 * @param {string} title - The title of the template to create.
 * @returns {Promise<void>} A promise that resolves when the template creation is complete.
 * @throws {Error} If there's an issue creating the template.
 */
async function createTemplate(title) {
  const projectRoot = path.join(__dirname, "..");
  const templateDir = path.join(projectRoot, "templates");
  const srcDir = path.join(projectRoot, "src");

  const mdxsDir = path.join(srcDir, "content/animation/");
  const animationsDir = path.join(srcDir, "animations");

  // TODO: get file length based on mdx
  try {
    const files = await fs.readdir(mdxsDir);
    const idx = files.length + 1;

    const templateAnimationDir = path.join(templateDir, "animation");
    const templateMdxDir = path.join(templateDir, "mdx");

    const animationTargetDir = path.join(animationsDir, `animation${idx}`);
    await createFolder(animationTargetDir);

    await writeContents(
      templateAnimationDir,
      animationTargetDir,
      undefined,
      title,
      idx,
    );

    const mdxTargetName = `post-${idx}.mdx`;
    await writeContents(templateMdxDir, mdxsDir, mdxTargetName, title, idx);
  } catch (error) {
    console.error("Error generating Templates :", error);
  }
}

async function createFolder(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log(`Folder created successfully at ${folderPath}`);
  } catch (error) {
    console.error("Error creating Folder :", error);
  }
}

async function createFile(filePath, content = "") {
  try {
    await fs.writeFile(filePath, content);
    console.log(`File created successfully at ${filePath}`);
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    console.log("File content:", content);
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function writeContents(dir, target, targetName, title, slug) {
  // NOTE: read contents
  const tempFiles = await fs.readdir(dir);
  const promises = tempFiles.map((filename) => {
    const dest = path.join(dir, filename);
    return readFileContent(dest);
  });
  const result = await Promise.all(promises);
  const contents = result.flat();

  // NOTE: write contents
  const writePromise = tempFiles.map((filename, index) => {
    const dest = path.join(target, targetName ?? filename);
    let content = contents[index];
    content = content.replaceAll("{{number}}", slug);
    content = content.replaceAll("{{title}}", title);
    return createFile(dest, content);
  });

  await Promise.all(writePromise);
}

export {
  createTemplate,
  createFolder,
  createFile,
  readFileContent,
  writeContents,
};
