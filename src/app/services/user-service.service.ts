import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:3000/users';
  user: any;

  constructor(private http: HttpClient) {}
  getUserData(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  updatePhoto(userId: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post<any>(`${this.apiUrl}/${userId}/photo`, formData);
  }
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, userData);
  }
}
