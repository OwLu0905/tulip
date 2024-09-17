import fs from "fs/promises";
import path from "path";

import {
  createFolder,
  createFile,
  readFileContent,
  writeContents,
} from "./createTemplate";

import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

vi.mock("fs/promises");
vi.mock("path");

describe("createFolder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a folder successfully", async () => {
    vi.spyOn(fs, "mkdir").mockResolvedValue(undefined);

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const folderPath = "/test/folder";
    await createFolder(folderPath);

    expect(fs.mkdir).toHaveBeenCalledWith(folderPath, { recursive: true });
    expect(consoleSpy).toHaveBeenCalledWith(
      `Folder created successfully at ${folderPath}`,
    );
  });
  it("should handle errors when creating a folder", async () => {
    vi.spyOn(fs, "mkdir").mockRejectedValue(new Error("Simulated error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await createFolder("/test/folder");

    // Assert that console.error was called with the expected message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating Folder :",
      expect.any(Error),
    );
    expect(consoleErrorSpy.mock.calls[0][1].message).toBe("Simulated error");
  });
});
