import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const window: any;

@Component({
  selector: 'app-first',
  template: `
    <div>
      <h1>First Page</h1>
      <button (click)="goToSecond()">Go To Second Page</button>
    </div>
  `,
  styles: [],
})
export class FirstComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.parent.postMessage(
      {
        type: 'UPDATE_SHELL_URL',
        payload: 'mini-app1/first-component',
      },
      '*'
    );
  }

  goToSecond() {
    this.router.navigate(['second-component']);
  }
}
