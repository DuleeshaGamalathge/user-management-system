import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  email: string | null = '';
  role: string | null = '';
  userId: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.email = this.authService.getUserEmail();
    this.role = this.authService.getUserRole();
    this.userId = this.authService.getUserId();
  }
}
