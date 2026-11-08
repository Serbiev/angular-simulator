import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, defer, finalize, Observable, of } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';

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
      return this.userApiService.getUsers()
    }).pipe(
      catchError(() => {
        this.messageService.showError('Не удалось загрузить пользователей');
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

}