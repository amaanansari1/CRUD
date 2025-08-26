import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employees } from '../interfaces/employees';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private url = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<employees[]> {
    return this.http.get<employees[]>(this.url);
  }

  addEmployees(user: employees): Observable<employees> {
    return this.http.post<employees>(this.url, user);
  }

  deleteEmployees(id: string): Observable<employees> {
    return this.http.delete<employees>(`${this.url}/${id}`);
  }

  getEmployeeById(id: string): Observable<employees> {
    return this.http.get<employees>(`${this.url}/${id}`);
  }

  updateEmployee(id: string, employee: employees): Observable<employees> {
    return this.http.put<employees>(`${this.url}/${id}`, employee);
  }
}
