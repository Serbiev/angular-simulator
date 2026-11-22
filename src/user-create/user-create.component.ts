import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../interfaces/IUser';

type UserFormValue = Omit<IUser, 'id'>;

type ControlsOf<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};

type UserFormControls = ControlsOf<UserFormValue>;

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  @Output() createUser = new EventEmitter<IUser>();

  userForm: FormGroup<UserFormControls> = this.fb.group<UserFormControls>({
    name: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    phone: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    website: this.fb.control('', [Validators.maxLength(100)]),
    address: this.fb.group({
      street: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
      suite: this.fb.control('', [Validators.maxLength(50)]),
      city: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      zipcode: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      geo: this.fb.group({
        lat: this.fb.control('', [Validators.required]),
        lng: this.fb.control('', [Validators.required]),
      }),
    }),
    company: this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: this.fb.control('', [Validators.maxLength(200)]),
      bs: this.fb.control('', [Validators.maxLength(100)]),
    }),
  });

  onSubmit(): void {
    const newUser: IUser = {
      ...this.userForm.getRawValue(),
      id: Date.now(),
    };
    this.createUser.emit(newUser);
    this.userForm.reset();
  }

}