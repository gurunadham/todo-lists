import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './pages/todos-component/todos-component';
import { UserTable } from './pages/user-table/user-table';
import { EmployeeTable } from './pages/employee-table/employee-table';
import { ProductCatalog } from './pages/product-catalog/product-catalog';
import { TaskBoardComponent } from './pages/task-board-component/task-board-component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet,TodosComponent, UserTable, EmployeeTable, ProductCatalog, TaskBoardComponent],
  imports: [TaskBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
