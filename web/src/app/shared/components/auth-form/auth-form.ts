import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApi } from '../../../features/auth/api/auth.api';

@Component({
    selector: 'app-auth-form',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './auth-form.html',
    styleUrl: './auth-form.css',
})
export class AuthForm {
    @Input() mode: 'login' | 'register' = 'login';
    form = new FormGroup({
        username: new FormControl('', { nonNullable: true }),
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(6)],
        }),
        confirm: new FormControl('', { nonNullable: true }),
    });
    private auth = inject(AuthApi);
    private router = inject(Router);

    async submit() {
        const { username, email, password, confirm } = this.form.getRawValue();

        if (this.mode === 'register') {
            if (!username) return;
            if (password !== confirm) return;

            await this.auth.register({ username, email, password }).toPromise();
            await this.auth.login({ email, password }).toPromise();
            this.router.navigateByUrl('/');
            return;
        }

        await this.auth.login({ email, password }).toPromise();
        this.router.navigateByUrl('/');
    }
}
