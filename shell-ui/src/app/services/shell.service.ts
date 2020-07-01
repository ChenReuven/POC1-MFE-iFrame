import { Injectable } from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  apps: any = {};
  showMenu: boolean = true;
  constructor() { }

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
      case 'UPDATE_NAVIGATION':
        console.log(payload);
        break;
    }
  }

  sendMessage(appName, message) {

  }

  addListenerToApp(appName, frame) {
    this.addFrame(appName, frame);
    window.addEventListener('message', this.dispatch.bind(this))
  }
}
