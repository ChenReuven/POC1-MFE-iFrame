import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="shell-top-nav">
      <div class="cyberark-logo">CyberArk Logo <span>Pin</span></div>
      <div class="apps-selection">
        Mini App 1 icon
      </div>
    </div>

    <iframe
      class="full-page iframe-container"
      src="http://localhost:4001/"
      frameborder="0"
    ></iframe>
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
    }
    .cyberark-logo {
      background: blue;
      padding: 10px;
      color: #FFF;
    }
    `,
  ],
})
export class AppComponent {
  title = 'shell-ui';
}
