import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageUtil } from '../shared/utils/local-storage';
import { STORAGE_KEY, TODO_STATUS } from '../shared/constants';
import { TodoItem } from '../shared/models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private router = inject(Router);
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get titleInvalid() {
    return (
      this.form.controls.title.touched &&
      this.form.controls.title.dirty &&
      this.form.controls.title.invalid
    );
  }

  get descriptionInvalid() {
    return (
      this.form.controls.description.touched &&
      this.form.controls.description.dirty &&
      this.form.controls.description.invalid
    );
  }

  get contentInvalid() {
    return (
      this.form.controls.content.touched &&
      this.form.controls.content.dirty &&
      this.form.controls.content.invalid
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAllAsTouched();
        control.markAsDirty();
      });
    }

    const currentTodoList = LocalStorageUtil.getItem<TodoItem[]>(
      STORAGE_KEY.todo
    );
    const newTodoItem: TodoItem = {
      ...this.form.getRawValue(),
      status: TODO_STATUS.planning,
    };

    LocalStorageUtil.setItem(STORAGE_KEY.todo, [
      ...(currentTodoList || []),
      newTodoItem,
    ]);

    this.form.reset();
    this.router.navigate(['/']);
  }
}
