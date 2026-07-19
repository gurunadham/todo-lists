import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  experience: number; // years
  city: string;
}

@Component({
  selector: 'app-employee-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  standalone: true
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  // UI state
  searchTerm = '';
  selectedDepartment = '';
  sortOrder: '' | 'asc' | 'desc' = '';
  departments: string[] = [];

  // Pagination
  pageSize = 5;
  currentPage = 1;

  // Selection
  selectedIds = new Set<number>();

  ngOnInit() {
    this.employees = [
      { id: 1, name: 'John Doe', email: 'john@example.com', department: 'HR', designation: 'Manager', salary: 50000, experience: 6, city: 'New York' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'IT', designation: 'Developer', salary: 60000, experience: 4, city: 'Los Angeles' },
      { id: 3, name: 'Michael Johnson', email: 'michael@example.com', department: 'Finance', designation: 'Analyst', salary: 55000, experience: 5, city: 'Chicago' },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', department: 'Marketing', designation: 'Designer', salary: 52000, experience: 3, city: 'Houston' },
      { id: 5, name: 'William Brown', email: 'william@example.com', department: 'Sales', designation: 'Salesperson', salary: 58000, experience: 7, city: 'Phoenix' },
      { id: 6, name: 'Sara Lee', email: 'sara@example.com', department: 'IT', designation: 'Developer', salary: 63000, experience: 5, city: 'Austin' },
      { id: 7, name: 'Carlos Reyes', email: 'carlos@example.com', department: 'Finance', designation: 'Analyst', salary: 54000, experience: 2, city: 'Miami' },
      { id: 8, name: 'Priya Patel', email: 'priya@example.com', department: 'HR', designation: 'Coordinator', salary: 47000, experience: 3, city: 'Seattle' },
      { id: 9, name: 'Ahmed Khan', email: 'ahmed@example.com', department: 'Marketing', designation: 'Manager', salary: 65000, experience: 8, city: 'Dallas' },
      { id: 10, name: 'Laura Green', email: 'laura@example.com', department: 'Sales', designation: 'Salesperson', salary: 56000, experience: 4, city: 'Denver' },
    ];

    this.departments = Array.from(new Set(this.employees.map(e => e.department)));
    this.resetFilters();
  }

  applyFilters() {
    const q = this.searchTerm.trim().toLowerCase();

    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !q || emp.name.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q);
      const matchesDept = this.selectedDepartment ? emp.department === this.selectedDepartment : true;
      return matchesSearch && matchesDept;
    });

    if (this.sortOrder === 'asc') {
      this.filteredEmployees.sort((a, b) => a.salary - b.salary);
    } else if (this.sortOrder === 'desc') {
      this.filteredEmployees.sort((a, b) => b.salary - a.salary);
    }

    this.currentPage = 1;
    this.selectedIds.clear();
  }

  // Pagination helpers
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredEmployees.length / this.pageSize));
  }

  get paginatedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  // Selection
  toggleSelect(emp: Employee) {
    if (this.selectedIds.has(emp.id)) this.selectedIds.delete(emp.id);
    else this.selectedIds.add(emp.id);
  }

  isSelected(emp: Employee) {
    return this.selectedIds.has(emp.id);
  }

  selectAllOnPage() {
    this.paginatedEmployees.forEach(e => this.selectedIds.add(e.id));
  }

  clearSelection() {
    this.selectedIds.clear();
  }

  deleteSelected() {
    if (this.selectedIds.size === 0) return;
    this.employees = this.employees.filter(e => !this.selectedIds.has(e.id));
    this.applyFilters();
    this.clearSelection();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.sortOrder = '';
    this.filteredEmployees = [...this.employees];
    this.currentPage = 1;
    this.selectedIds.clear();
  }

  trackById(_: number, p: Employee) {
    return p.id;
  }
}
