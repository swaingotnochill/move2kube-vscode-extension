import * as vscode from "vscode";
import * as child_process from "child_process";
import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("m2k.showHelloWorld", () => {
    HelloWorldPanel.render(context.extensionUri);
  });

  // `plan` command.
  const planCommand = commands.registerCommand("m2k.plan", async (uri: vscode.Uri | undefined) => {
    vscode.window.showInformationMessage(`Move2Kube: Running plan command`);
    console.log("Move2Kube: Plan command is running...");

    // Determine the current working directory based on the URI that was clicked in the explorer.
    const cwd =
      uri?.fsPath ||
      (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) ||
      process.cwd();

    // Run the plan command in the current working directory.
    const result = child_process.spawnSync("move2kube", ["plan"], { cwd });

    // Show the output of the command in a new output channel.
    const channel = vscode.window.createOutputChannel("move2kube: plan");
    channel.show();
    channel.append(result.stdout.toString());
    channel.append(result.stderr.toString());
  });

  const transformCommand = commands.registerCommand("m2k.transform", () => {
    vscode.window.showInformationMessage("Transform command initiated.");
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
  context.subscriptions.push(transformCommand);
  context.subscriptions.push(planCommand);
}
