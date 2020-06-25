import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="shell-top-nav">
      <div class="cyberark-logo">CyberArk Logo <span>Pin</span></div>
      <div class="apps-selection">
        <button (click)="navigateTo('mini-app1')">Mini App 1 icon</button>
        <button (click)="navigateTo('mini-app2')">Mini App 2 icon</button>
      </div>
    </div>

    <div>
      <iframe
        *ngIf="selectedApp === 'mini-app1'"
        class="full-page iframe-container"
        src="http://localhost:4001/"
        frameborder="0"
      ></iframe>
      <iframe
        *ngIf="selectedApp === 'mini-app2'"
        class="full-page iframe-container"
        src="http://localhost:4001/"
        frameborder="0"
      ></iframe>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
    .full-page {
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
    }
    .iframe-container {
      border: 0px'
    }
    .shell-top-nav {
      position: absolute;
      box-sizing: border-box;
      background: #FFF;
    }
    .cyberark-logo {
      background: blue;
      padding: 10px;
      color: #FFF;
    }
    .apps-selection{
      display: flex;
      flex-direction: column;
    }
    `,
  ],
})
export class AppComponent {
  title = 'shell-ui';
  selectedApp = 'mini-app1';

  navigateTo(app: string): void {
    this.selectedApp = app;
  }
}
