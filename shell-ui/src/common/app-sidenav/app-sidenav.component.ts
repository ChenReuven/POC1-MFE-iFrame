import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface MenuLink {
  url: string;
  name: string;
  displayName?: string;
}
@Component({
  selector: 'app-sidenav',
  template: `
    <div class="shell-top-nav">
      <div class="cyberark-logo">
        <span *ngIf="show">CyberArk Logo</span>
        <button (click)="toggleMenu()">Pin</button>
      </div>
      <div *ngIf="show" class="apps-selection">
        <button (click)="navigateTo('mini-app1')">Mini App 1 icon</button>
        <button (click)="navigateTo('mini-app2')">Mini App 2 icon</button>
        <div class="app-app-sidenav">
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* :host {
        width: 100%;
        top: 85px;
      } */
      .shell-top-nav {
        box-sizing: border-box;
        background: #fff;
      }
      .cyberark-logo {
        background: blue;
        padding: 10px;
        color: #fff;
      }
    `,
  ],
})
export class AppSidenavComponent implements OnInit {
  @Input() menuLinks: MenuLink[];
  @Input() show: boolean;
  @Output() toggle = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  navigateTo(url: string) {}

  toggleMenu() {
    this.toggle.emit('');
  }
}
