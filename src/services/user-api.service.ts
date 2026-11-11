import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://jsonplaceholder.typicode.com/users123';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }

}