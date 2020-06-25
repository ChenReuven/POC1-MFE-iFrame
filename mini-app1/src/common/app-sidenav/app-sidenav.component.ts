import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-sidenav',
  template: `
    <div class="app-app-sidenav">
      <div>Menu 1</div>
      <div>Menu 1</div>
      <div>Menu 1</div>
      <div>Menu 1</div>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        width: 100%;
        top: 56px;
      }
      .app-app-sidenav {
        position: fixed;
        background: red;
        width: 140px;
      }
    `,
  ],
})
export class AppSidenavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
