let child_process = require("child_process");

const fileToConvert = "CB/%07d.jpg";
const outputPath = __dirname;
const outputName = "video";
const outputFormat = "mp4";

child_process.execSync(
  `ffmpeg -i ${fileToConvert} ${
    outputName
      ? `${outputPath}/${outputName}.${outputFormat}`
      : `${outputPath}/video.${outputFormat}`
  }`,
  {
    stdio: Object.values({
      stdin: "inherit",
      stdout: "inherit",
      stderr: "inherit",
    }),
  }
);
