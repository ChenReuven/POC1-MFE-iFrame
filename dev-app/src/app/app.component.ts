import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dev-app';
  todos: any[] = [];

  ngOnInit(): void {
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((res) => res.json())
      .then((res) => {
        this.todos = [...res];
      });
  }
}
