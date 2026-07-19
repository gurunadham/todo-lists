import { Component } from '@angular/core';
import { UserTableService } from '../../services/user-table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
  standalone: true,
})
export class UserTableComponent {
  users: any[] = [];

  constructor(private userTableService: UserTableService) {}


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userTableService.getUsers().subscribe(
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
