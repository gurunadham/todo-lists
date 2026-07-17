import { Component } from '@angular/core';
import { UserService } from './user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
  standalone: true,
})
export class UserTable {
  users: any[] = [];

  constructor(private userService: UserService) {}


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('Fetched users:', data);
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
