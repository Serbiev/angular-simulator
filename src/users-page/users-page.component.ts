import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.getUsers();

  constructor() {
    this.userService.loadUsers()
      .pipe(takeUntilDestroyed())
      .subscribe();
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

}