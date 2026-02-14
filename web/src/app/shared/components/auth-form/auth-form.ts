import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-auth-form',
    imports: [RouterLink, NgOptimizedImage],
    templateUrl: './auth-form.html',
    styleUrl: './auth-form.css',
})
export class AuthForm {
    @Input() mode: 'login' | 'register' = 'login';
}
