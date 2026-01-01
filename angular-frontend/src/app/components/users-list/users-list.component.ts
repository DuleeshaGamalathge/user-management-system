import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
//   template: `
//   <h2>Users List</h2>
//   <ul>
//     <li *ngFor="let user of users">{{ user.name }} - {{ user.email }}</li>
//   </ul>
// `
})
export class UsersListComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        console.log('Users from API:', data);
        this.users = data;
      },
      error: err => console.error('API error:', err)
    });
  }
  

}
