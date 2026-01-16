import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent },
    { path: 'dashboard', component: DashboardComponent}
];
