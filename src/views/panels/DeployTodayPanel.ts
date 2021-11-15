import * as vscode from 'vscode';

export default class DeployTodayPanel {
    public static currentPanel: DeployTodayPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor (panel: vscode.WebviewPanel, dataDeployToday: any) {
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel = panel;
        const webViewContent = this.getWebviewContent(dataDeployToday);
        this._panel.webview.html = webViewContent;
    }


    public static createOrShow(dataDeployToday: any) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (DeployTodayPanel.currentPanel) {
            DeployTodayPanel.currentPanel._panel.reveal(column);
            return;
        }



        const panel = vscode.window.createWebviewPanel("DeployTodayPanel", "Should I Deploy Today?", column || vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        DeployTodayPanel.currentPanel = new DeployTodayPanel(panel, dataDeployToday);
    }


    private getWebviewContent(dataDeployToday: any | []) {

        const colorText = dataDeployToday.shouldideploy ? 'color: #cc0000!important;' :  '';
        
        return `<!DOCTYPE html>
          <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Signin</title>
            </head>
            <body>

                <div class="wrapper">
                  <div class="item">
                    <h3 class="tagline">Should I Deploy Today?</h3>
                    <h2 id="text">${dataDeployToday.message}</h2>
                  </div>
                </div>
              <script>
                const vscode = acquireVsCodeApi();
                (function init() {
                  document.vscode = vscode;
                })();
              </script>
              
            </body>
            <style>
              body.vscode-light .username, body.vscode-light .password {
                color: #616466;
                
              }
              body.vscode-dark .username, body.vscode-dark .password {
                color: #C2C7CC;
              }
              
              .wrapper {
                  min-height: 100vh;
                  display: grid;
                  grid-template-rows: 1fr auto;
                  justify-content: center;
              }

              .tagline {
                  font: 300 3rem/2.8rem SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
                  text-align: center;
              }

              #text {
                  font: 900 9rem/8.5rem -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
                  text-align: center;
                  ${colorText}
              }


            </style>
          </html>`;
    }

    public dispose() {
        DeployTodayPanel.currentPanel = undefined;
        this._panel.dispose()
        while (this._disposables.length) {
            const panel = this._disposables.pop();
            if (panel) {
                panel.dispose();
            }
        }
    }
}
