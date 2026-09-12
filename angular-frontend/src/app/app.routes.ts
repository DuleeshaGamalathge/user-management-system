import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppShellComponent } from './components/layout/app-shell/app-shell.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        component: AppShellComponent,
        canActivate: [authGuard],
        children: [
            { path: 'users', component: UsersListComponent},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'profile', component:ProfileComponent},
            { path: 'activity', component:ActivityComponent}
        ]
    },
    
    { path: 'login', component:LoginComponent},

];