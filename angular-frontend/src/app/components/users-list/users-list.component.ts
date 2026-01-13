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

  //add loading status
  isLoading = false;
  isSaving = false;
  isDeleting = false;
  errorMessage = '';

  //load users
  loadUsers() {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
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
  formUser: User = {
    id: 0,
    name: '',
    email: ''
  };
  
  isEditMode = false;

  selectedUser: User | null = null;

  //update user
  editUser(user: User) {
    this.formUser = { ...user }; // copy, not reference
    this.isEditMode = true;
  }

  cancel() {
    this.formUser = { id: 0, name: '', email: '' };
    this.isEditMode = false;
  }
  
  //add user
  addNewUser(){
    this.formUser = {
      id: 0,
      name: '',
      email: ''
    };
    this.isEditMode = false;
  }
  
  //validation error

  validationErrors: any = {}; //store backend error messages
  apiError: string | null = null;

  handleError(err: any) {
    if (err.status === 400 && err.error?.errors) {
      this.validationErrors = err.error.errors;
    } else {
      console.error(err);
    }
  }
  
  //save user
  saveUser(form: any) {
    if (form.invalid) return;

    this.isSaving = true;
  
    this.apiError = null; // clear previous errors
  
    const request$ = this.isEditMode
      ? this.userService.updateUser(this.formUser.id, this.formUser)
      : this.userService.addUser(this.formUser);
  
    request$.subscribe({
      next: () => {
        this.loadUsers();
        this.cancel();
        this.isSaving = false;
        form.resetForm();
      }, 
      error: (err) => {
        this.apiError = err.error || 'Something went wrong';
      }
    });
  }
    
}
