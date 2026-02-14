import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  imports: [RouterModule, Header],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
