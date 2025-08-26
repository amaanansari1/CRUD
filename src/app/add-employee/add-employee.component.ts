import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { employees } from '../interfaces/employees';
import { EmployeesService } from '../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  users: employees[] = [];
  selectedUser: employees | undefined;
  isEditMode: boolean = false;
  employeeId: string | null = null;

  message: string = '';
  messageType: 'success' | 'error' = 'success';
  showMessage: boolean = false;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');

      if (this.employeeId) {
        this.isEditMode = true;
        this.employeeService
          .getEmployeeById(this.employeeId)
          .subscribe((data: employees) => {
            this.selectedUser = data;
          });
      } else {
        this.isEditMode = false;
        this.selectedUser = undefined;
      }
    });

    this.employeeService.getEmployees().subscribe((data: employees[]) => {
      this.users = data;
    });
  }

  onSubmit(data: employees) {
    const exist = this.users.filter(
      (emp) =>
        emp.id !== this.employeeId &&
        (emp.email.toLowerCase() === data.email.toLowerCase() ||
          emp.phone === data.phone)
    );

    if (exist.length > 0) {
      this.showCustomMessage('User with same details already exists', 'error');
      return;
    }

    if (this.isEditMode && this.employeeId) {
      this.employeeService
        .updateEmployee(this.employeeId, data)
        .subscribe(() => {
          this.showCustomMessage('Employee Updated Successfully...', 'success');
          setTimeout(() => this.router.navigate(['/manageEmployee']), 2500);
        });
    } else {
      this.employeeService.addEmployees(data).subscribe(() => {
        this.showCustomMessage('Employee Added Successfully...', 'success');
        setTimeout(() => this.router.navigate(['/manageEmployee']), 3000);
      });
    }
  }

  showCustomMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3600);
  }
}
