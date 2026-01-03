import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  //load users
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }  
  
  //delete user
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }

  // add | update user
  selectedUser: User | null = null;

  //update user
  editUser(user: User) {
    this.selectedUser = { ...user }; // copy, not reference
  }

  cancelEdit(form: any) {
    this.selectedUser = null;
  }
  
  //add user
  addNewUser(){
    this.selectedUser = {
      id: 0,
      name: '',
      email: ''
    };
  }
  
  //validation error

  validationErrors: any = {}; //store backend error messages

  handleError(err: any) {
    if (err.status === 400 && err.error?.errors) {
      this.validationErrors = err.error.errors;
    } else {
      console.error(err);
    }
  }
  
  //save user
  saveUser(form: any){
    if (form.invalid || !this.selectedUser) return;

    if (this.selectedUser.id === 0){
      //create
      this.userService.addUser(this.selectedUser).subscribe({
        next: (created) => {
          this.users.push(created);
          this.selectedUser = null;
        },
        error: (err) => this.handleError(err)
      });
    } else {
      //update
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.selectedUser = null;
        },
        error: (err) => this.handleError(err)
      });
    }    
  }   
}
