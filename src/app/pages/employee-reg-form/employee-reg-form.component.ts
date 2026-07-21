import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-reg-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-reg-form.component.html',
  styleUrls: ['./employee-reg-form.component.css'],
})
export class EmployeeRegFormComponent {
  employeeForm: FormGroup;

  departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Marketing' },
    { id: 5, name: 'Sales' },
    { id: 6, name: 'Admin' }
  ];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      department: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      skills: this.fb.group({
        angular: false,
        react: false,
        javascript: false,
        typescript: false,
      }),
      address: this.fb.group({
        street: [''],
        city: [''],
        zipCode: [''],
      }),
      previousCompanies: this.fb.array([]),
    });
  }

  get previousCompanies(): FormArray {
    return this.employeeForm.get('previousCompanies') as FormArray;
  }

  addPreviousCompany() {
    this.previousCompanies.push(
      this.fb.group({
        companyName: [''],
        designation: [''],
        years: [''],
      })
    );
  }

  removeCompany(index: number) {
    this.previousCompanies.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Employee Registration Data:', this.employeeForm.value);
      this.employeeForm.reset();
      this.previousCompanies.clear();
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.previousCompanies.clear();
  }
}
