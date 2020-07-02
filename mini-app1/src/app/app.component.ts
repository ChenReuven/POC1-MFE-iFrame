import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- Layout for Side Nav App -->
    <div>
      <div class="main-layout">
        <!--The content below is only a placeholder and can be replaced.-->
        <h3 class="title">Angular App</h3>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .main-layout {
        margin-left: 15%;
      }

      .title {
        background: red;
        color: #fff;
      }
    `,
  ],
})
export class AppComponent {
  title = 'mini-app1';
  miniAppState = {
    showMenu: true,
  };

  @HostListener('window:message', ['$event']) onPostMessage(event) {
    if (!event.data.type && event.type === 'message') {
      const data = JSON.parse(event.data);
      console.log(data.showMenu);
      this.miniAppState.showMenu = data.showMenu;
    }
  }

  constructor() {}
}
