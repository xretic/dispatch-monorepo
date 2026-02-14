import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink, MatIconModule, MatButtonModule, RouterLinkActive],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    theme = inject(ThemeService);

    @Output() menuClick = new EventEmitter<void>();
    @Input() isMobile = false;
}
