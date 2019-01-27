// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest/utils");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig");

module.exports = {
    // preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: null,
    testRegex: "test\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
};
