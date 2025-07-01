import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage())
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {}

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  register(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return new Observable(observer => {
      this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, data).subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          observer.next({ token, user });
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    })
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
