import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface UserForm  {
  name: string;
  email: string;
  password: string;
  role: string;
}

// export interface UpdateUserRequest {
//   name: string;
//   email: string;
//   password?: string;
//   role: string;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5274/api/users'; // .NET API endpoint

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: UserForm): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user:UserForm){
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
}
