import { Component } from '@angular/core';
import { AuthForm } from '../../shared/components/auth-form/auth-form';

@Component({
    selector: 'app-login',
    imports: [AuthForm],
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})
export class Login {}
