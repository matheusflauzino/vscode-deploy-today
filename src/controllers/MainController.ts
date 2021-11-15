import * as vscode from 'vscode';
import HttpRequestAPI from '../services/HttpRequestAPI';
import { isBlank } from '../shared/utils';
import DeployTodayPanel from '../views/panels/DeployTodayPanel';


export default class {
    context: vscode.ExtensionContext;
    constructor (context: vscode.ExtensionContext) {
        this.context = context;
    }

    public async showDeployTodayPanel() {
        if (isBlank(vscode.workspace.rootPath)) {
            vscode.window.showInformationMessage('Please open a workspace');
            return;
        }

        try {
            const data = await HttpRequestAPI.getShoulDeployAPIResponse();
            DeployTodayPanel.createOrShow(data);            
        } catch (error: any) {
            console.log(error.message);
        }
    }
}