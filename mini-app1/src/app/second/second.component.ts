import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const window: any;

@Component({
  selector: 'app-second',
  template: `
    <div>
      <h1>Second Page</h1>
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

  goToFirst() {
    this.router.navigate(['first-component']);
  }
}
