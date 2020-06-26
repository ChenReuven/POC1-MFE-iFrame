import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  template: `
    <p>
      first works!
      <button (click)="goToSecond()">Second Component</button>
    </p>
  `,
  styles: [],
})
export class FirstComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToSecond() {
    this.router.navigate(['second-component']);
  }
}
