const fs = require("fs");
const path = require("path");
const eventEmitter = require("events");
const emitter = new eventEmitter();

// part 1  question 1
function showpath() {
  console.log(`file: ${__filename}`);
  console.log(`dir: ${__dirname}`);
}
showpath();

// part 1 question 2
function getFileName(filePath) {
  const fileName = path.basename(filePath);
  return fileName;
}
console.log(getFileName("/user/files/report.pdf"));

// part 1 question 3
function buildpath({ dir, name, ext }) {
  return path.format({ dir, name, ext });
}
console.log(buildpath({ dir: "/folder", name: "app", ext: ".js" }));

// part 1 question 4
function getextension(filePath) {
  return path.extname(filePath);
}
console.log(getextension("/docs/readme.md"));

// part 1 question 5
function parsepath(filePath) {
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  return { name, ext };
}
console.log(parsepath("/home/app/main.js"));

// part 1 question 6
function checkabsolute(filePath) {
  return path.isAbsolute(filePath);
}
console.log(checkabsolute("/home/user/file.txt"));

// part 1 question 7
function multiplePaths(...paths) {
  return path.join(...paths);
}
console.log(multiplePaths("src", "components", "App.js"));

// part 1 question 8
function resolvepath(relpath) {
  return path.resolve(relpath);
}
console.log(resolvepath("./index.js"));

//part 1 question 9
function joinpaths(path1, path2) {
  return path.join(path1, path2);
}
console.log(joinpaths("/folder1", "folder2/file.txt"));

// part 1 question 10
function deleteFile(filePath) {
  fs.unlinkSync(filePath);
  console.log(`${filePath} deleted`);
}

fs.writeFileSync("data.txt", "This is some sample data.", "utf8");
const dataFilePath = path.resolve("./data.txt");
deleteFile(dataFilePath);

// part 1 question 11
function createFolder(folderName) {
  try {
    fs.mkdirSync(folderName);
    console.log(`"success"`);
  } catch (err) {
    console.log("Folder already exists or error occurred");
  }
}
createFolder("newFolder");

// part 1 question 12
emitter.on("start", () => {
  console.log("Welcome event triggered!");
});
emitter.emit("start");

//part 1 question 13
emitter.on("login", (username) => {
  console.log(`"User logged in: ${username}"`);
});
emitter.emit("login", "mina");

// part 1 question 14
const noteFilePath = path.resolve("./note.txt");
try {
  const data = fs.readFileSync(noteFilePath, "utf8");
  console.log("this file content =>", data);
} catch (err) {
  console.log("Error reading file:", err);
}

// part 1 question 15
const asyncFilePath = path.resolve("./async.txt");
fs.writeFile(asyncFilePath, "Async save", "utf8", (err) => {
  if (err) {
    console.log("Error writing file:", err);
  } else {
    console.log("File saved asynchronously!");
  }
});

//part 1 question 16
function isDirectoryExists(dirPath) {
  const fullPath = path.resolve(dirPath);
  try {
    return fs.statSync(fullPath).isDirectory();
  } catch (err) {
    return false;
  }
}
console.log(isDirectoryExists("./notes"));

// part 1 question 17
const os = require("os");
function getSystemInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}
console.log(getSystemInfo());
