import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'login', component:LoginComponent}
];
