import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface AppMenuLink {
  url: string;
  name: string;
  displayName?: string;
}

export interface MiniAppMenuLink {
  path: string;
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
        <button class="menu-app-btn" *ngFor="let appMenu of appMenuLinks">
          {{ appMenu.displayName }}
        </button>
        <div class="app-app-sidenav">
          <div *ngFor="let miniAppMenu of miniAppMenuLinks">
            {{ miniAppMenu.displayName }}
          </div>
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
      .menu-app-btn {
        display: block;
      }
    `,
  ],
})
export class AppSidenavComponent implements OnInit {
  @Input() appMenuLinks: AppMenuLink[];
  @Input() miniAppMenuLinks: MiniAppMenuLink[];

  @Input() show: boolean;
  @Output() toggle = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  navigateTo(url: string) {}

  toggleMenu() {
    this.toggle.emit('');
  }
}
