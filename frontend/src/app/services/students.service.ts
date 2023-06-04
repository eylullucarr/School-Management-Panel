import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:1800/api/student'; // Backend URL

  getStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }

  AddEditStudent(
    postData: any,
    selectedStudent: any //türünü fark etmez
  ) {
    if (!selectedStudent) {
      return this.http.post(`${this.baseUrl}`, postData);
    } else {
      return this.http.put(`${this.baseUrl}/${selectedStudent.id}`, postData);
    }
  }

  deleteStudent(studentID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${studentID}`);
  }
}
