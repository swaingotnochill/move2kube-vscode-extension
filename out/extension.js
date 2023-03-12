"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const vscode_1 = require("vscode");
const HelloWorldPanel_1 = require("./panels/HelloWorldPanel");
function activate(context) {
    // Create the show hello world command
    const showHelloWorldCommand = vscode_1.commands.registerCommand("m2k.showHelloWorld", () => {
        HelloWorldPanel_1.HelloWorldPanel.render(context.extensionUri);
    });
    const transformCommand = vscode_1.commands.registerCommand("m2k.transform", () => {
        vscode.window.showInformationMessage("Transform command initiated.");
    });
    // Add command to the extension context
    context.subscriptions.push(showHelloWorldCommand);
    context.subscriptions.push(transformCommand);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map