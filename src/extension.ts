import * as vscode from "vscode";
import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("m2k.showHelloWorld", () => {
    HelloWorldPanel.render(context.extensionUri);
  });
  
  const transformCommand = commands.registerCommand("m2k.transform", () => {
    vscode.window.showInformationMessage("Transform command initiated.")
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
  context.subscriptions.push(transformCommand);
}
