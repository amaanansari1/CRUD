import { Component } from '@angular/core';
import { employees } from '../interfaces/employees';
import { EmployeesService } from '../services/employees.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css',
})
export class ManageEmployeeComponent {
  user: employees[] = [];

  constructor(
    private employeeService: EmployeesService,
    private route: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data: employees[]) => {
      this.user = data.reverse();
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete ?')) {
      this.employeeService.deleteEmployees(id).subscribe(() => {
        console.log(`Deleted User ID ${id}`);
        this.loadEmployees();
      });
    }
  }
}
