import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    isDark = signal(false);
    private storageKey = 'theme';

    constructor() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved === 'dark') {
            this.isDark.set(true);
            document.body.classList.add('dark-theme');
        }

        effect(() => {
            const dark = this.isDark();

            if (dark) {
                document.body.classList.add('dark-theme');
                localStorage.setItem(this.storageKey, 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem(this.storageKey, 'light');
            }
        });
    }

    toggle() {
        this.isDark.update((v) => !v);
    }
}
