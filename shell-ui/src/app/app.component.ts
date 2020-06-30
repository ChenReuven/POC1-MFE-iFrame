import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
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

    <!-- div>
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
    </div-->
    <div main id="apps-container" class="full-page iframe-container">
      <router-outlet></router-outlet>
    </div>
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
  showMenu = true;
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

  // @HostListener('window:hashchange', ['$event']) someFunction(event) {
  //   console.log('window:hashchange');
  //   console.log('event = ', event);
  // }

  ngAfterViewInit(): void {
    this.createAppFrame('mini-app1');
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.selectedApp === 'mini-app1') {
      this.miniApp1Ref.nativeElement.contentWindow.postMessage(
        JSON.stringify({ showMenu: this.showMenu }),
        'http://localhost:4201'
      );
      this.miniApp1Ref.nativeElement.contentWindow.addEventListener(
        'hashchange',
        (event) => {
          console.log('The hash has changed!');
        },
        false
      );
    } else if (this.selectedApp === 'mini-app2') {
      this.miniApp2Ref.nativeElement.contentWindow.postMessage(
        JSON.stringify({ showMenu: this.showMenu }),
        'http://localhost:4202'
      );
    }
  }

  private createAppFrame(
    appName: string,
    innerRoute: string = ''
  ): HTMLIFrameElement {
    const frame = document.createElement('iframe');
    frame.id = `frame-${appName}`;
    frame.name = `frame-${appName}`;
    frame.setAttribute('data-app-name', appName);
    // tslint:disable-next-line: deprecation
    //frame.frameBorder = '0';

    // if first app
    // if (!this.currentAppName) {
    //   this.currentAppName = appName;
    // }
    this.appendFrame(frame);
    frame.src = this.applications[appName].url + innerRoute;
    this.applications[appName].frame =

    // frame.addEventListener('load', this.onFrameLoad.bind(this, frame, appName));
    frame.addEventListener('load', function () {
      console.log('Loaded!');
      // frame.contentWindow.addEventListener(
      //   'hashchange',
      //   function (event) {
      //     console.log('The hash has changed!');
      //   },
      //   false
      // );
      frame.addEventListener(
        'popstate',
        function (event) {
          console.log(
            'location: ' +
              document.location +
              ', state: ' +
              JSON.stringify(event)
          );
        },
        false
      );
    });

    return frame;
  }

  private onFrameLoad(frame: HTMLIFrameElement, appName: string): void {
    try {
      console.log('frame.contentWindow = ', frame.contentWindow);
      // frame.contentWindow.addEventListener(
      //   'hashchange',
      //   (event) => {
      //     console.log('The hash has changed!');
      //   },
      //   false
      // );
    } catch (error) {
      // In some cases we're getting to CORS origin issue, for example when V9 redirects
      // to a resubmission page (chrome-error://chromewebdata/ in chrome)
      // the origin is not the same anymore, in such a case we'll redirect to the default page.
      // Such a scenario can be found at EPV-2558 bug in JIRA or in the changeset for this check-in.
    }
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

  navigateTo(app: string): void {
    this.selectedApp = app;
  }
}
