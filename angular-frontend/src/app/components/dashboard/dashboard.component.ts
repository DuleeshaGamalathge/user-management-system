import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DashboardService, DashboardSummary } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register( ArcElement, Tooltip, Legend, DoughnutController );

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit, OnDestroy {

  summary: DashboardSummary | null = null;

  isLoading = false;
  errorMessage = '';

  @ViewChild('roleChart')
  roleChartCanvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('statusChart')
  statusChartCanvas!: ElementRef<HTMLCanvasElement>;

  private roleChart: Chart | undefined;
  private statusChart: Chart | undefined;

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

        setTimeout(() => {
          this.createRoleChart();
          this.createStatusChart();
        });
      },
      error: (err) => {
        console.error('Failed to load dashboard', err);
        this.errorMessage = 'Unable to load dashboard data.';
        this.isLoading = false;
      }
    });
  }


  // Role Chart
  private createRoleChart(): void {
    if (!this.roleChartCanvas || !this.summary) {
      return;
    }
  
    const roles = this.summary.usersByRole
      .map(item => item.role || 'Unassigned');
  
    const userCounts = this.summary.usersByRole
      .map(item => item.userCount);
  
    this.roleChart?.destroy();
  
    this.roleChart = new Chart(
      this.roleChartCanvas.nativeElement,
      {
        type: 'doughnut',
  
        data: {
          labels: roles,
  
          datasets: [
            {
              data: userCounts,
              backgroundColor: this.summary.usersByRole.map(
                item => this.getRoleColor(item.role)
              )
            }
          ]
        },
  
        options: {
          responsive: true,
          maintainAspectRatio: false,
  
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      }
    );
  }

  private getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#dc3545';
  
      case 'user':
        return '#0d6efd';
  
      default:
        return '#6c757d';
    }
  }

  // Account Status Chart
  private createStatusChart(): void {
    if (!this.statusChartCanvas || !this.summary) {
      return;
    }
  
    const activeUsers = this.summary.activeUsers;
    const inactiveUsers = this.summary.inactiveUsers;
  
    this.statusChart?.destroy();
  
    this.statusChart = new Chart(
      this.statusChartCanvas.nativeElement,
      {
        type: 'doughnut',
  
        data: {
          labels: ['Active', 'Inactive'],
  
          datasets: [
            {
              data: [activeUsers, inactiveUsers],
              backgroundColor: [
                '#198754',
                '#dc3545'
              ]
            }
          ]
        },
  
        options: {
          responsive: true,
          maintainAspectRatio: false,
  
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.roleChart?.destroy();
    this.statusChart?.destroy();
  }

}