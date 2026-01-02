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
  
  //add new user
  // newUser: User = {
  //   id: 0,
  //   name: '',
  //   email: ''
  // };
  
  // addUser() {
  //   this.userService.addUser(this.newUser).subscribe({
  //     next: (createdUser) => {
  //       this.users.push(createdUser); // update UI instantly
  //       this.newUser = { id: 0, name: '', email: '' }; // reset form
  //     },
  //     error: (err) => console.error('Add user failed', err)
  //   });
  // }
  
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

  //update user
  // selectedUser: User | null = null;

  // editUser(user: User) {
  //   this.selectedUser = { ...user }; // copy, not reference
  // }
  
  
  // updateUser() {
  //   if (!this.selectedUser) return;
  
  //   this.userService.updateUser(this.selectedUser.id, this.selectedUser)
  //     .subscribe({
  //       next: () => {
  //         this.loadUsers();      // refresh list
  //         this.selectedUser = null;
  //       },
  //       error: (err) => console.error(err)
  //     });
  // }

  //save user
  selectedUser: User | null = null;
  isEditMode = false;

  userFormModel: User = {
    id: 0,
    name: '',
    email: ''
  };

  editUser(user: User) {
    this.userFormModel = { ...user }; // copy
    this.isEditMode = true;
  }

  //reset form
  resetForm(form: any) {
    form.resetForm();
    this.userFormModel = { id: 0, name: '', email: '' };
    this.isEditMode = false;
  }

  cancelEdit(form: any) {
    this.resetForm(form);
  }
  

  saveUser(form: any){
    if (form.invalid) return;

    if (this.isEditMode){
      //update
      this.userService
      .updateUser(this.userFormModel.id, this.userFormModel)
      .subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm(form);
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      //create
      this.userService.addUser(this.userFormModel).subscribe({
        next: (createdUser) => {
          this.users.push(createdUser);
          this.resetForm(form);
        },
        error: (err) => console.error('Add failed', err)
      });
    }    
    
  }
  
   
}
