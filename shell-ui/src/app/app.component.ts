import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
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
    `,
  ],
})
export class AppComponent {
  title = 'shell-ui';
}
