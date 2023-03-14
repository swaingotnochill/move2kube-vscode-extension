"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const child_process = require("child_process");
const vscode_1 = require("vscode");
const HelloWorldPanel_1 = require("./panels/HelloWorldPanel");
function activate(context) {
    // Create the show hello world command
    const showHelloWorldCommand = vscode_1.commands.registerCommand("m2k.showHelloWorld", () => {
        HelloWorldPanel_1.HelloWorldPanel.render(context.extensionUri);
    });
    // `plan` command.
    const planCommand = vscode_1.commands.registerCommand("m2k.plan", (uri) => __awaiter(this, void 0, void 0, function* () {
        vscode.window.showInformationMessage(`Move2Kube: Running plan command`);
        console.log("Move2Kube: Plan command is running...");
        // Determine the current working directory based on the URI that was clicked in the explorer.
        const cwd = (uri === null || uri === void 0 ? void 0 : uri.fsPath) ||
            (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) ||
            process.cwd();
        // Run the plan command in the current working directory.
        const result = child_process.spawnSync("move2kube", ["plan"], { cwd });
        // Show the output of the command in a new output channel.
        const channel = vscode.window.createOutputChannel("move2kube: plan");
        channel.show();
        channel.append(result.stdout.toString());
        channel.append(result.stderr.toString());
    }));
    const transformCommand = vscode_1.commands.registerCommand("m2k.transform", () => {
        vscode.window.showInformationMessage("Transform command initiated.");
    });
    // Add command to the extension context
    context.subscriptions.push(showHelloWorldCommand);
    context.subscriptions.push(transformCommand);
    context.subscriptions.push(planCommand);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map