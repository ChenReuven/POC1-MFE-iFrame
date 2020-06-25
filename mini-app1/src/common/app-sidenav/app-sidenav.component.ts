import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-sidenav',
  template: `
    <div *ngIf="show" class="app-app-sidenav">
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
        top: 85px;
      }
      .app-app-sidenav {
        position: fixed;
        background: red;
        width: 149px;
      }
    `,
  ],
})
export class AppSidenavComponent implements OnInit {
  @Input() show;

  constructor() {}

  ngOnInit(): void {}
}
