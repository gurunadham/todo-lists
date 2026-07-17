import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  city: string;
}

@Component({
  selector: 'app-employee-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.css',
  standalone: true
})
export class EmployeeTable {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  selectedDepartment: string = '';
  sortOrder = '';

  departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];
  roles = ['Manager', 'Developer', 'Analyst', 'Designer', 'Salesperson'];


  ngOnInit() {
    this.employees = [
      { id: 1, name: 'John Doe', department: 'HR', salary: 50000, city: 'New York' },
      { id: 2, name: 'Jane Smith', department: 'IT', salary: 60000, city: 'Los Angeles' },
      { id: 3, name: 'Michael Johnson', department: 'Finance', salary: 55000, city: 'Chicago' },
      { id: 4, name: 'Emily Davis', department: 'Marketing', salary: 52000, city: 'Houston' },
      { id: 5, name: 'William Brown', department: 'Sales', salary: 58000, city: 'Phoenix' }
    ];
    this.filteredEmployees = [...this.employees];
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter(employee => {
      const matchesSearchTerm = employee.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = this.selectedDepartment ? employee.department === this.selectedDepartment : true;
      return matchesSearchTerm && matchesDepartment;
    });

    if(this.sortOrder === 'asc') {
      this.filteredEmployees.sort((a, b) => a.salary - b.salary);
    } else {
      this.filteredEmployees.sort((a, b) => b.salary - a.salary);
    }
  }
  
  resetFilters() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.sortOrder = 'asc';
    this.filteredEmployees = [...this.employees];
  }
   
}
