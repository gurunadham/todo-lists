import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './pages/todos-component/todos-component';
import { UserTable } from './pages/user-table/user-table';
import { EmployeeTable } from './pages/employee-table/employee-table';
import { ProductCatalog } from './pages/product-catalog/product-catalog';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet,TodosComponent, UserTable, EmployeeTable, ProductCatalog],
  imports: [ ProductCatalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
