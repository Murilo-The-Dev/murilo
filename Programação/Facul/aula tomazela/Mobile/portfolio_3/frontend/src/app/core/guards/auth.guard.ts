import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const localToken = localStorage.getItem('token');
    const prefToken = await Preferences.get({ key: 'token' });
    const token = localToken || prefToken.value;

    if (token && this.isValidToken(token)) {
      return true;
    }

    await this.router.navigate(['/login']);
    return false;
  }

  private isValidToken(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }

      const payload = JSON.parse(atob(parts[1]));
      return !!payload.exp && payload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }
}
