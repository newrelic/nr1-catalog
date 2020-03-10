import * as core from "@actions/core";
import * as path from "path";
import fs from "fs";

async function run() {
  try {
    const files = core.getInput("files");
    const fileList = files.split(/,\s+/);

    const inputPath: string = core.getInput("path", { required: true });

    var doesntExist: string[] = [];
    fileList.forEach(function(file) {
      const pathedFile: string = path.join(inputPath, file);
      console.debug("Pathed file: " + pathedFile);
      if (!fs.existsSync(pathedFile)) {
        doesntExist.push(pathedFile);
      }
    });
    if (doesntExist.length > 0) {
      core.setFailed("These files do not exist: " + doesntExist.join(", "));
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
