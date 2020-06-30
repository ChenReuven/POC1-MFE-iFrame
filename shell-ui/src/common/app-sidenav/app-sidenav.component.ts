import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface MenuLink {
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
        <button
          class="menu-app-btn"
          *ngFor="let appMenu of appMenuLinks"
          (click)="navigateTo(appMenu)"
        >
          {{ appMenu.displayName }}
        </button>
        <div class="app-app-sidenav">
          <div
            *ngFor="let miniAppMenu of miniAppMenuLinks"
            (click)="navigateTo(miniAppMenu)"
          >
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
  @Input() appMenuLinks: MenuLink[];
  @Input() miniAppMenuLinks: MenuLink[];

  @Input() show: boolean;
  @Output() toggle = new EventEmitter<string>();
  @Output() click = new EventEmitter<MenuLink>();

  constructor() {}

  ngOnInit(): void {}

  navigateTo(link: MenuLink) {
    this.click.emit(link);
  }

  toggleMenu() {
    this.toggle.emit('');
  }
}
