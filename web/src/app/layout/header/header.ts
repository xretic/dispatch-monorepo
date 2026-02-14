import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    imports: [RouterLink, MatIconModule],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    theme = inject(ThemeService);
}
