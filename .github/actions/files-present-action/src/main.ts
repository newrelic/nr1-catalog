import * as core from "@actions/core";
import * as path from "path";
import fs from "fs";

async function run() {
    validatePackageJson();
    validateCatalogFiles();
    validateScreenshotsDir();
}

/**
 * Files that should be present will be passed in via input args
 * @see {@link https://github.com/newrelic/nr1-catalog/issues/3|Issue 3}
 */
function validateCatalogFiles() {
    try {
        const inputPath: string = core.getInput("path", { required: true });
        const files = core.getInput("files");
        const fileList = files.split(/,\s+/);

        var doesntExist: string[] = [];
        fileList.forEach(function (file) {
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

function validateScreenshotsDir() {
    const wd: string = process.env[`GITHUB_WORKSPACE`] || "";
    const inputPath: string = core.getInput("path", { required: true });
    const screenshotsPath: string = path.join(wd, inputPath, "catalog/screenshots");

    // TODO: Remove
    // if (fs.readdirSync(screenshotsPath).length === 0) {
    //     core.setFailed("")
    // }

    fs.readdir(screenshotsPath, (err, files) => {
        if (err) {
            core.setFailed("Failed to read catalog/screenshots directory");
        }

        if (!files.length) {
            core.setFailed("No screenshots present in catalog/screenshots. Must have at least one.");
        }
    });
}

/**
 * package.json should contain the following fields:
 *  version
 *  scripts.eslint-check
 *  scripts.eslint-fix
 * @see {@link https://github.com/newrelic/nr1-catalog/issues/3|Issue 3}
 */
function validatePackageJson() {
    try {
        const wd: string = process.env[`GITHUB_WORKSPACE`] || "";
        const inputPath: string = core.getInput("path", { required: true });
        const packageJsonPath: string = path.join(wd, inputPath, "package.json");
        const packageJson = require(packageJsonPath);

        if (!packageJson.hasOwnProperty('version')) {
            core.setFailed("version missing from package.json");
        }

        if (!packageJson.hasOwnProperty('scripts')) {
            core.setFailed("scripts missing from package.json");
        }

        if (!packageJson.scripts.hasOwnProperty('eslint-check')) {
            core.setFailed("eslint-check missing from package.json#scripts");
        }

        if (!packageJson.scripts.hasOwnProperty('eslint-fix')) {
            core.setFailed("eslint-fix missing from package.json#scripts");
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

/**
 * Temp: Keep for now, but probably remove
 */
// function getPackageJSON<T = object>(): T {
//     const workspace = process.env.GITHUB_WORKSPACE as string
//     const pathToPackage = path.join(workspace, 'package.json')
//     if (!fs.existsSync(pathToPackage)) throw new Error('package.json could not be found in your project\'s root.')
//     return require(pathToPackage)
// }

run();
