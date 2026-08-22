import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardSummary } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  summary: DashboardSummary | null = null;

  isLoading = false;
  errorMessage = '';

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard', err);
        this.errorMessage = 'Unable to load dashboard data.';
        this.isLoading = false;
      }
    });
  }
}