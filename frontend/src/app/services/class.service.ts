import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:1800/api/class'; // Backend URL

  getClass(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.baseUrl}`);
  }

  AddEditClass(
    postData: any,
    selectedClass: any //türünü fark etmez
  ) {
    if (!selectedClass) {
      return this.http.post(`${this.baseUrl}`, postData);
    } else {
      return this.http.put(`${this.baseUrl}/${selectedClass.id}`, postData);
    }
  }

  deleteClass(classID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${classID}`);
  }
}
