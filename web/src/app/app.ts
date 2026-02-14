import { Component, HostListener, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';

@Component({
    imports: [RouterModule, Header, RouterOutlet, MatSidenavModule, MatIcon],
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    isMobile = signal(window.innerWidth <= 1000);

    @HostListener('window:resize')
    onResize() {
        this.isMobile.set(window.innerWidth <= 1000);
    }
}
