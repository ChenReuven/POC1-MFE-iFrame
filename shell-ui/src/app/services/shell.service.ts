import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FakeComponent } from '../components/fake/fake.component';
import { BehaviorSubject } from 'rxjs';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  private readonly _links = new BehaviorSubject<any[]>([]);
  readonly links$ = this._links.asObservable();

  apps: any = {};
  showMenu: boolean = true;
  constructor(
    private ngZone: NgZone,
    private location: Location,
    private router: Router
  ) { }

  addFrame(appName, frame) {
    this.apps[appName] = frame;
  }

  dispatch({ data: { type, payload } }) {
    console.log('action:::::', type);
    switch (type) {
      case 'SHOW_MENU':
        this.showMenu = true;
        break;
      case 'HIDE_MENU':
        this.showMenu = false;
        break;
      case 'TOGGLE_MENU':
        this.showMenu = !this.showMenu;
        break;
      case 'UPDATE_SHELL_URL':
        this.ngZone.run(() => {
          // this.router.navigateByUrl(payload);
          this.location.replaceState(payload);
        });
        break;
      case 'UPDATE_NAVIGATION':
        this._links.next(payload.routes.map(r => {
          return {
            ...r,
            routerLink: `${payload.appName}/${r.routerLink}`,
          }
        }));
        break;
    }
  }

  addListenerToApp(appName, frame) {
    this.addFrame(appName, frame);
    window.addEventListener('message', this.dispatch.bind(this))
  }
}
