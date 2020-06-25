import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="shell-top-nav">
      <div class="cyberark-logo">
        <span *ngIf="showMenu">CyberArk Logo</span>
        <button (click)="toggleMenu()">Pin</button>
      </div>
      <div *ngIf="showMenu" class="apps-selection">
        <button (click)="navigateTo('mini-app1')">Mini App 1 icon</button>
        <button (click)="navigateTo('mini-app2')">Mini App 2 icon</button>
      </div>
    </div>

    <div>
      <iframe
        *ngIf="selectedApp === 'mini-app1'"
        class="full-page iframe-container"
        src="http://localhost:4201/"
        frameborder="0"
        #miniApp1
      ></iframe>
      <iframe
        *ngIf="selectedApp === 'mini-app2'"
        class="full-page iframe-container"
        src="http://localhost:4202/"
        frameborder="0"
        #miniApp2
      ></iframe>
    </div>

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
      background: #FFF;
    }
    .cyberark-logo {
      background: blue;
      padding: 10px;
      color: #FFF;
    }
    .apps-selection{
      display: flex;
      flex-direction: column;
    }
    `,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'shell-ui';
  selectedApp = 'mini-app1';
  showMenu: boolean = true;
  @ViewChild('miniApp1') miniApp1Ref: ElementRef;
  @ViewChild('miniApp2') miniApp2Ref: ElementRef;

  ngAfterViewInit(): void {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.selectedApp === 'mini-app1') {
      window.postMessage;
      this.miniApp1Ref.nativeElement.contentWindow.postMessage(
        JSON.stringify({ showMenu: this.showMenu }),
        'http://localhost:4201'
      );
    } else if (this.selectedApp === 'mini-app2') {
      this.miniApp2Ref.nativeElement.contentWindow.postMessage(
        JSON.stringify({ showMenu: this.showMenu }),
        'http://localhost:4202'
      );
    }
  }

  navigateTo(app: string): void {
    this.selectedApp = app;
  }
}
