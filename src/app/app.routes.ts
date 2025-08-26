import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  }, // default lazy [5]
  {
    path: 'addEmployee',
    loadComponent: () =>
      import('./add-employee/add-employee.component').then(m => m.AddEmployeeComponent),
  }, // static lazy [8]
  {
    path: 'addEmployee/:id',
    loadComponent: () =>
      import('./add-employee/add-employee.component').then(m => m.AddEmployeeComponent),
  }, // param lazy [8]
  {
    path: 'manageEmployee',
    loadComponent: () =>
      import('./manage-employee/manage-employee.component').then(m => m.ManageEmployeeComponent),
  }, // static lazy [8]
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  }, // wildcard last [10]
];
