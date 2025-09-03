import { Component } from '@angular/core';
import { employees } from '../interfaces/employees';
import { EmployeesService } from '../services/employees.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css'],
})
export class ManageEmployeeComponent {
  user: employees[] = [];
  showPopup = false;
  selectedEmployeeId: string | null = null;
  showToast = false;
  toastMessage = '';

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

  // open popup
  confirmDelete(id: string) {
    this.selectedEmployeeId = id;
    this.showPopup = true;
  }

  // cancel popup
  cancelDelete() {
    this.showPopup = false;
    this.selectedEmployeeId = null;
  }

  // delete employee
  deleteEmployee() {
    if (this.selectedEmployeeId) {
      this.employeeService.deleteEmployees(this.selectedEmployeeId).subscribe(() => {
        this.loadEmployees();
        this.showPopup = false;
        this.showToastMessage('Deleted successfully ✅');
      });
    }
  }

  // toast logic
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
