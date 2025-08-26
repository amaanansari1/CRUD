import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
}
