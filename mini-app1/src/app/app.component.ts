import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- Layout for Side Nav App -->
    <div>
      <app-app-sidenav [show]="miniAppState.showMenu"> </app-app-sidenav>

      <div class="main-layout">
        <!--The content below is only a placeholder and can be replaced.-->
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .main-layout {
        margin-left: 15%;
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
