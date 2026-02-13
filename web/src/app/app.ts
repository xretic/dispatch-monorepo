import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  imports: [RouterModule, Header],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  count = signal(0);
  protected description = 'test';

  increment() {
    this.count.set(this.count() + 1);
  }
}
