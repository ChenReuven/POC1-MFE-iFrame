import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { APP_MENU_LINKS, MINI_APP_MENU_LINKS } from './menuLinks.const';
import { MenuLink } from 'src/common/app-sidenav/app-sidenav.component';
import { ShellService } from './services/shell.service';

declare let window: any;

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-sidenav
        class="app-sidenav"
        [show]="shellService.showMenu"
        [appMenuLinks]="appMenuLinks"
        [miniAppMenuLinks]="miniAppMenuLinks"
        (toggle)="showMenu = !showMenu"
        (click)="navigateTo($event)"
      >
      </app-sidenav>
      <div main id="apps-container" class="iframe-container full-page">
      </div>
    </div>
  `,
  styles: [
    `
    .app-sidenav{
      width: 20%;
      display: inline-block;
      vertical-align: top;
    }
    .full-page {
      height: 100vh;
      margin: 0;
      padding: 0;
      display: inline-block;
    }
    .iframe-container {
      border: 0px'
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
  selectedApp;
  showMenu = true;
  appMenuLinks = APP_MENU_LINKS;
  miniAppMenuLinks = MINI_APP_MENU_LINKS;

  applications = {
    'mini-app1': {
      url: 'http://localhost:4201',
    },
    'mini-app2': {
      url: 'http://localhost:4202',
    },
  };
  @ViewChild('miniApp1') miniApp1Ref: ElementRef;
  @ViewChild('miniApp2') miniApp2Ref: ElementRef;

  constructor(public shellService: ShellService) {

  }

  ngAfterViewInit(): void {
    this.loadAppByRoute();
    window.addEventListener('hashchange', () => {

      console.log('!!!hashchange!!!');

      // this.loadAppByRoute.bind(this)
    })
  }

  loadAppByRoute() {
    const [empty, appName, ...pathname] = window.location.pathname.split('/');
    if (!!appName) {
      const frame = this.createAppFrame(appName, pathname.join('/'));
      this.shellService.addListenerToApp(appName, frame);
    }
  }

  toggleMenu() {
    this.shellService.dispatch(<any>{ data: { type: 'TOGGLE_MENU' } });
  }

  private createAppFrame(
    appName: string,
    innerRoute: string = ''
  ): HTMLIFrameElement {
    const frame = document.createElement('iframe');
    frame.id = `frame-${appName}`;
    frame.name = `frame-${appName}`;
    frame.setAttribute('data-app-name', appName);
    frame.frameBorder = '0';
    frame.classList.add('app-frame');

    // if first app
    if (!this.selectedApp) {
      this.selectedApp = appName;
    }
    this.appendFrame(frame);
    frame.src = this.applications[appName].url + '/#/' + innerRoute;

    return frame;
  }

  private appendFrame(frame: HTMLIFrameElement): void {
    try {
      this.getContainer().appendChild(frame);
    } catch (e) {
      throw new Error('Container is not exist');
    }
  }

  private getContainer(): HTMLElement {
    return document.querySelector('#apps-container') as HTMLElement;
  }

  private getCurrentIframe(): HTMLFrameElement {
    // todo: shoule fix
    return document.querySelector('.app-frame') as HTMLFrameElement;
  }

  navigateTo(link: string): void {
    // Need to Update iFrame
    if (typeof link === 'string' && !!link) {
      console.log(link);
      const appName = link.split('/')[0];
      const pathname = link.replace(appName, '');
      this.getCurrentIframe().src = this.applications[appName].url + '/#/' + pathname;
    }
    console.log('000000000');
  }
}
