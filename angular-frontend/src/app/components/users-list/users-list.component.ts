import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  
  //add new user
  newUser: User = {
    id: 0,
    name: '',
    email: ''
  };
  
  addUser() {
    this.userService.addUser(this.newUser).subscribe({
      next: (createdUser) => {
        this.users.push(createdUser); // update UI instantly
        this.newUser = { id: 0, name: '', email: '' }; // reset form
      },
      error: (err) => console.error('Add user failed', err)
    });
  }
  
}
