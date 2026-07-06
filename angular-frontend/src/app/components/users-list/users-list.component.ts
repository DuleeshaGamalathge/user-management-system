import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User, UserForm } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  //Data
  users: User[] = [];

  //UI status
  isLoading = false;
  isSaving = false;
  isDeleting = false;
  isEditMode = false;
  errorMessage = '';

  // define user for add | update user
  editingUserId: number | null = null;

  formUser: UserForm  = {
    name: '',
    email: '',
    password: '',
    role: '',
  };

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

  //Load users when page open
  ngOnInit(): void {
    this.loadUsers();
  }  
  
  //delete user
  deleteUser(id: number) {
    if (!confirm('Are you sure you want to deactivate this user?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }

  //update user

  //switch form into edit mode
  editUser(user: User ) {
    this.editingUserId = user.id;

    this.formUser = { 
      name: user.name,
      email: user.email,
      password: '',
      role: user.role 
    };

    this.isEditMode = true;
  }

  //reset form
  cancel() {
    this.editingUserId = null;

    this.formUser = { 
      name: '', 
      email: '', 
      password: '', 
      role: '' 
    };

    this.isEditMode = false;
  }
  
  //add user
  addNewUser(){
    this.editingUserId = null;

    this.formUser = {
      name: '',
      email: '',
      password: '',
      role: ''
    };

    this.isEditMode = false;
  }
  
  //validation error

  validationErrors: any = {}; //store backend error messages
  apiError: string | null = null;
  
  //save user
  saveUser(form: any) {
    if (form.invalid || this.isSaving) return;

    this.isSaving = true;  
    this.apiError = null; // clear previous errors
  
    const request$ = this.isEditMode
      ? this.userService.updateUser(this.editingUserId!, this.formUser)
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
        this.isSaving = false;
      }
    });
  }
    
}
