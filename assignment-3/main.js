const fs = require("fs");

//part 1 question 1
const stream = fs.createReadStream("./big.txt", "utf-8");
stream.on("data", (chunk) => {
  console.log("Data chunk:", chunk);
});
stream.on("error", (err) => {
  console.error("Error reading the file:", err);
});
stream.on("end", () => {
  console.log("Finished reading the file.");
});

//part 1 question 2
const readStream = fs.createReadStream("./source.txt");
const writeStream = fs.createWriteStream("./dest.txt");

readStream.pipe(writeStream);

readStream.on("error", (err) => {
  console.log("Error in reading file:", err);
});

writeStream.on("error", (err) => {
  console.log("Error in writing file:", err);
});

writeStream.on("finish", () => {
  console.log("File copied using streams");
});

//part 1 question 3
const zlib = require("zlib");
const { pipeline } = require("stream");

pipeline(
  fs.createReadStream("./data.txt"),
  zlib.createGzip(),
  fs.createWriteStream("./data.txt.gz"),
  (err) => {
    if (err) console.log("Error:", err);
    else console.log("File compressed successfully");
  },
);
