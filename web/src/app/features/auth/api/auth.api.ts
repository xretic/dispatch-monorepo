import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

export type User = { id: string; email: string; username: string; avatarUrl: string };

@Injectable({ providedIn: 'root' })
export class AuthApi {
    private http = inject(HttpClient);
    private base = 'http://localhost:3200/api';
    private _user$ = new BehaviorSubject<User | null>(null);
    user$ = this._user$.asObservable();

    register(data: { username: string; email: string; password: string }) {
        return this.http
            .post<User>(`${this.base}/auth/register`, data)
            .pipe(tap((user) => this._user$.next(user)));
    }

    login(data: { email: string; password: string }) {
        return this.http
            .post<{ user: User }>(`${this.base}/auth/login`, data)
            .pipe(tap((res) => this._user$.next(res.user)));
    }

    me() {
        this.http
            .get<User | null>(`${this.base}/auth/me`)
            .subscribe((user) => this._user$.next(user));
    }

    logout() {
        return this.http
            .post(`${this.base}/auth/logout`, {})
            .pipe(tap(() => this._user$.next(null)));
    }
}
