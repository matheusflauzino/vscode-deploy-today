import * as vscode from 'vscode';
import Controller from './controllers/MainController';

export function activate(context: vscode.ExtensionContext) {
	const controller = new Controller(context);
	let disposable = vscode.commands.registerCommand('deploy-today.shouldIDeployToday', () => {
		controller.showDeployTodayPanel();
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
