import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const window: any;

@Component({
  selector: 'app-second',
  template: `
    <div>
      <h1>Second Page</h1>
      <button (click)="raiseAlert()">Press For Alert</button>
      <button (click)="goToFirst()">Go To First Page</button>
    </div>
  `,
  styles: [],
})
export class SecondComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.parent.postMessage(
      {
        type: 'UPDATE_SHELL_URL',
        payload: 'mini-app1/second-component',
      },
      '*'
    );
  }

  raiseAlert(): void {
    window.parent.postMessage(
      {
        type: 'SHELL_RAISE_ALERT',
        payload: 'Angular - Alert From Mini App 1 - Second Component',
      },
      '*'
    );
  }

  goToFirst() {
    this.router.navigate(['first-component']);
  }
}
