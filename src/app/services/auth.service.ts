import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, SignupRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Replace with your API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if user is logged in on service initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(loginData: LoginRequest): Observable<any> {
    // For demo purposes, we'll simulate login
    return new Observable(observer => {
      setTimeout(() => {
        const mockUser: User = {
          id: 1,
          username: 'Demo User',
          email: loginData.email
        };
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('token', 'demo-jwt-token');
        this.currentUserSubject.next(mockUser);
        observer.next({ user: mockUser, token: 'demo-jwt-token' });
        observer.complete();
      }, 1000);
    });
  }

  signup(signupData: SignupRequest): Observable<any> {
    // For demo purposes, we'll simulate signup
    return new Observable(observer => {
      setTimeout(() => {
        const mockUser: User = {
          id: 1,
          username: signupData.username,
          email: signupData.email
        };
        observer.next({ user: mockUser });
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}