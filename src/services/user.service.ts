import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, defer, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  loadUsers(): Observable<IUser[]> {
    return defer(() => {
      this.loaderService.showLoader();
      return this.userApiService.getUsers();
    }).pipe(
      tap((users: IUser[]) => {
        this.setUsers(users);
      }),
      catchError(() => {
        this.messageService.showError('Нет пользователей для отображения');
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }

}