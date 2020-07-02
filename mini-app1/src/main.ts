import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export interface MenuLink {
  path?: string;
  name: string;
  displayName?: string;
  routerLink?: string[]
}

declare const window: any;

// todo: add lifecycle
window.parent.postMessage({
  type: 'UPDATE_NAVIGATION', payload: {
    appName: 'mini-app1',
    routes: [{
      routerLink: 'first-component',
      displayName: 'First page'
    },
    {
      routerLink: 'second-component',
      displayName: 'Second page'
    }]
  }
}, '*');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
