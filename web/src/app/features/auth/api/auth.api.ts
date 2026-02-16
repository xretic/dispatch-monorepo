import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type User = { id: string; email: string; username: string; avatarUrl: string };

@Injectable({ providedIn: 'root' })
export class AuthApi {
    private http = inject(HttpClient);
    private base = 'http://localhost:3000/api';

    register(data: { username: string; email: string; password: string }) {
        return this.http.post<User>(`${this.base}/auth/register`, data);
    }

    login(data: { email: string; password: string }) {
        return this.http.post<{ user: User }>(`${this.base}/auth/login`, data);
    }

    me() {
        return this.http.get<User | null>(`${this.base}/auth/me`);
    }

    logout() {
        return this.http.post(`${this.base}/auth/logout`, {});
    }
}
