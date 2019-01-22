"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const nodeCleanup = require("node-cleanup");
nodeCleanup(function (exitCode, signal) {
    // release resources here before node exits
    console.log('Quitting');
    process.exit(0);
});
process.stdin.resume();
const main = () => __awaiter(this, void 0, void 0, function* () {
    let state = store_1.default.getState();
});
main();
//# sourceMappingURL=index.js.map