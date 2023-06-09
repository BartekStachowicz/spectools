import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { environment } from '../../../environments/environment';

const API_LOGINURL = environment.apiURL + environment.apiAuthLoginKey;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userId: string;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  loginError: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  login(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        API_LOGINURL,
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['admin', 'dashboard']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
          this.loginError = error.error.message;
        }
      );
  }

  autoLogin() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const duration = authInfo.expirationDate.getTime() - now.getTime();
    if (duration > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(duration / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/admin']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userid', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userid');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userid');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
