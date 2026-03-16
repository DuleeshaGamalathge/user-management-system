import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5274/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
  
    return jwtDecode(token);
  }

  getUserEmail(): string | null {
    const decoded = this.getDecodedToken();
    return decoded
      ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
      : null;
  }
  
  getUserRole(): string | null {
    const decoded = this.getDecodedToken();
    return decoded
      ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      : null;
  }
  
  getUserId(): string | null {
    const decoded = this.getDecodedToken();
    return decoded
      ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
      : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
