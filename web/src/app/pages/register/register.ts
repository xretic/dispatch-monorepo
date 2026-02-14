import { Component } from '@angular/core';
import { AuthForm } from '../../shared/components/auth-form/auth-form';

@Component({
    selector: 'app-register',
    imports: [AuthForm],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {}
