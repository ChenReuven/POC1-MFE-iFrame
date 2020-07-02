import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fake',
  template: `
    <p>
      fake works!
    </p>
  `,
  styles: [
  ]
})
export class FakeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
