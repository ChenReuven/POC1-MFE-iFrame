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
        <a
          class="menu-link"
          *ngFor="let appMenu of appMenuLinks"
          (click)="navigateTo(appMenu)"
        >
          {{ appMenu.displayName }}
        </a>
        <div class="app-app-sidenav">
          <a
            class="menu-link"
            *ngFor="let miniAppMenu of miniAppMenuLinks"
            (click)="navigateTo(miniAppMenu)"
          >
            {{ miniAppMenu.displayName }}
          </a>
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
        background: #000;
        padding: 10px;
        color: #fff;
        border-bottom: 1px solid #fff;
      }
      .menu-link {
        display: block;
        color: #fff;
        cursor: pointer;
        padding: 5px;
        background: #0011ff;
      }
      .menu-link:hover {
        background: #007bff;
      }
      .app-app-sidenav {
        border-top: 2px dashed #000;
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
