import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardSummary {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  usersByRole: DashboardRoleSummary[];
  registrationsByMonth: RegistrationStatistics[];
  recentLogins: RecentLogin[];
}

export interface DashboardRoleSummary {
  role: string;
  userCount: number;
}

export interface RegistrationStatistics {
  period: string;
  userCount: number;
}

export interface RecentLogin {
  email: string;
  loginTime: string;
  isSuccess: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:5274/api/dashboard';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
  }
}