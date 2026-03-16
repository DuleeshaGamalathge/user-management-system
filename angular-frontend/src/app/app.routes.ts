import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'login', component:LoginComponent},
    { path: 'profile', component:ProfileComponent, canActivate: [authGuard]}
];