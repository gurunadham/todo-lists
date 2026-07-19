import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosListComponent } from './pages/todos-list/todos-list.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { EmployeeTableComponent } from './pages/employee-table/employee-table.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { TaskBoardComponent } from './pages/task-board/task-board-component';

@Component({
  selector: 'app-root',
  standalone: true,
  /* imports: [
    RouterOutlet,
    TodosListComponent, 
    UserTable, 
    EmployeeTableComponent, 
    ProductCatalogComponent, 
    TaskBoardComponent
   ]  */

  imports: [EmployeeTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
