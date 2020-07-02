import { Component, OnInit } from '@angular/core';
declare const window: any;

@Component({
  selector: 'app-second',
  template: `
    <p>
      second works!
    </p>
  `,
  styles: [
  ]
})
export class SecondComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.parent.postMessage({
      type: 'UPDATE_SHELL_URL', payload: 'mini-app1/second-component'
    }, '*');
  }

}
