import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { APP_MENU_LINKS, MINI_APP_MENU_LINKS } from './menuLinks.const';
import { ShellService } from './services/shell.service';
import { Router } from '@angular/router';
import { getParameterByName } from './utils';

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
        (toggle)="toggleMenu()"
        (click)="navigateTo($event)"
      >
      </app-sidenav>
      <div main id="apps-container" class="iframe-container full-page">
        <router-outlet></router-outlet>
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
      width: 80%;
      display: inline-block;
    }
    .iframe-container {
      border: 0px'
    }
    .apps-selection{
      display: flex;
      flex-direction: column;
    }
    .app-frame {
      width: 100%;
    }
    `,
  ],
})
export class AppComponent implements OnInit {
  @Input() title: string;
  @Input() url: string;

  selectedApp = 'mini-app1';
  showMenu = true;
  appMenuLinks = APP_MENU_LINKS;
  miniAppMenuLinks = MINI_APP_MENU_LINKS;
  isDevMode = false;
  devUrlHost: string;

  applications: any = {
    'mini-app1': {
      url: 'http://localhost:4201',
    },
    'mini-app2': {
      url: 'http://localhost:4202',
    },
    'mini-app3': {
      url: 'http://localhost:4203',
    },
  };

  @HostListener('window:popstate', ['$event']) onPopstate(event) {
    const [, appName, ...pathname] = window.location.pathname.split('/');
    this.shellService.chanageNavBarFromCache(appName);
    const url = appName + '/' + (pathname.join('/'))
    this.navigateTo(url);
  }

  constructor(public shellService: ShellService, private router: Router) { }

  ngOnInit(): void {
    const isDevMode = getParameterByName('devMode');
    if (isDevMode) {
      const devUrlHost = getParameterByName('devUrlHost');
      this.devUrlHost = devUrlHost || 'http://localhost:3000/';
      this.isDevMode = true;
      this.selectedApp = 'dev-app';
      this.loadDevModeApp();
    } else {
      this.loadAppByRoute();
    }
  }

  loadDevModeApp() {
    this.applications = {
      'dev-app': {
        url: this.devUrlHost,
      },
    };
    const frame = this.createAppFrame('dev-app', '/');
    this.shellService.addListenerToApp('dev-app', frame);
  }

  loadAppByRoute() {
    const [, appName, ...pathname] = window.location.pathname.split('/');
    if (!!appName) {
      this.createAppFrame(appName, pathname.join('/'));
    } else {
      this.router.navigateByUrl('/mini-app1/first-component');
      this.createAppFrame('mini-app1', '/first-component');
    }
  }

  toggleMenu() {
    console.log('TOGGLE_MENU 2')
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
    frame.classList.add('current');

    // if first app
    if (!this.selectedApp) {
      this.selectedApp = appName;
    }
    this.appendFrame(frame);
    // frame.src = this.applications[appName].url + '/' + innerRoute;
    frame.src = this.applications[appName].url + '/#/' + innerRoute;
    this.shellService.addListenerToApp(appName, frame);
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

  private getFramesList(): any {
    return document.querySelectorAll('.app-frame') || [];
  }

  private getFrameByName(appName: string): HTMLIFrameElement {
    return <HTMLIFrameElement>document.querySelector(`#frame-${appName}`);
  }

  activeFrame(appName: string, selectedFrame: HTMLIFrameElement) {
    if (this.selectedApp !== appName) {
      this.getFramesList().forEach((frame) => {
        frame.classList.remove('current');
      });
      this.selectedApp = appName;
      setTimeout(() => {
        selectedFrame.classList.add('current');
      });

      selectedFrame.contentWindow.postMessage({ type: 'RESUME' }, '*');
    }
  }

  navigateTo(link: string): void {
    // Need to Update iFrame
    if (typeof link === 'string' && !!link && link !== '/') {
      const appName = link.split('/')[0];
      let pathname = link.replace(appName, '');

      let frame = this.getFrameByName(appName);
      if (frame) {
        if (pathname.indexOf('/') !== 0) {
          pathname = `/${pathname}`;
        }
        frame.contentWindow.location.replace(
          this.applications[appName].url + '/#' + pathname
        );
      } else {
        frame = this.createAppFrame(appName, pathname);
      }
      this.activeFrame(appName, frame);
    }
  }
}
