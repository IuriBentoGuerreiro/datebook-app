import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { RefreshTokenResponse } from '../model/RefreshTokenResponse';
import { LoginResponse } from '../model/LoginResponse';
import { LoginRequest } from '../model/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private subjectUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private subjectLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private baseUrl = 'https://datebook-api.onrender.com/api/auth/'
  private endpointRefresh = `${this.baseUrl}/refresh-token/`;

  constructor(private http: HttpClient) {
    const token = this.getAccessToken();
    if (token) {
      this.subjectLogin.next(true);
      this.subjectUser.next(this.getUserFromToken()); // Você pode recuperar o usuário do token ou armazená-lo quando o login for feito
    } else {
      this.subjectLogin.next(false);
    }
  }

  login(login: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, login).pipe(
      map((response) => {
        this.storeTokens(response.accessToken, response.refreshToken);
        this.subjectUser.next(response.user);
        this.subjectLogin.next(true);
        return response.user;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user);
  }

  logout() {
    this.clearTokens();
    this.subjectUser.next(null);
    this.subjectLogin.next(false);
  }

  isLogged(): Observable<boolean> {
    return this.subjectLogin.asObservable();
  }

  getUser(): Observable<User | null> {
    return this.subjectUser.asObservable();
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RefreshTokenResponse>(`${this.endpointRefresh}`, { refreshToken }).pipe(
      map((response) => {
        this.storeTokens(response.accessToken, response.refreshToken);
        return response;
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  private storeTokens(accessToken: string, refreshToken: string) {
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private getRefreshToken(): string | null {
    return sessionStorage.getItem('refresh_token');
  }

  private clearTokens() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
  }

  private getUserFromToken(): User | null {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeJwt(token);
      return decodedToken ? decodedToken.user : null;
    }
    return null;
  }

  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }

  checkUsername(username: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.baseUrl}check-username?username=${username}`);
  }
}