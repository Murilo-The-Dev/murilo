import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenCache: string | null = localStorage.getItem('token');
  private userCache: User | null = this.getLocalUser();
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.tokenCache = response.token;
          this.userCache = response.user;

          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          void Preferences.set({ key: 'token', value: response.token });
          void Preferences.set({ key: 'user', value: JSON.stringify(response.user) });
        })
      );
  }

  logout(): void {
    this.tokenCache = null;
    this.userCache = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    void Preferences.remove({ key: 'token' });
    void Preferences.remove({ key: 'user' });

    void this.router.navigate(['/login']);
  }

  getTokenSync(): string | null {
    return this.tokenCache || localStorage.getItem('token');
  }

  async getToken(): Promise<string | null> {
    const syncToken = this.getTokenSync();
    if (syncToken) {
      this.tokenCache = syncToken;
      return syncToken;
    }

    const { value } = await Preferences.get({ key: 'token' });
    if (value) {
      this.tokenCache = value;
      localStorage.setItem('token', value);
    }

    return value;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  async getUser(): Promise<User | null> {
    if (this.userCache) {
      return this.userCache;
    }

    const localUser = this.getLocalUser();
    if (localUser) {
      this.userCache = localUser;
      return localUser;
    }

    const { value } = await Preferences.get({ key: 'user' });
    if (!value) {
      return null;
    }

    try {
      const user = JSON.parse(value) as User;
      this.userCache = user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return null;
    }
  }

  private getLocalUser(): User | null {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch (error) {
      return null;
    }
  }
}
