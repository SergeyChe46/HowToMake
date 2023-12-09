import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateResponse } from 'src/interfaces/authenticateResponse.interface';
import { UserLoginModel } from 'src/models/auth/userLoginModel.interface';
import { UserRegisterModel } from 'src/models/auth/userRegisterModel.interface';

const BASE_URL: string = 'https://localhost:7205/Account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN: string = 'token';
  constructor(private httpClient: HttpClient) {}

  register(userData: UserRegisterModel) {
    this.httpClient.post(BASE_URL + '/register', userData).subscribe({
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  private getToken(userData: UserLoginModel): Observable<AuthenticateResponse> {
    return this.httpClient.post<AuthenticateResponse>(
      BASE_URL + '/Login',
      userData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  login(userData: UserLoginModel): void {
    this.getToken(userData).subscribe({
      next: (response: AuthenticateResponse) => {
        localStorage.removeItem(this.TOKEN);
        localStorage.setItem(this.TOKEN, response.token);
      },
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
  }

  get isLoggedIn() {
    return localStorage.getItem(this.TOKEN) != null;
  }
}
