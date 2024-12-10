import { Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { STORAGE_KEY } from '../shared/constants';
import { TodoItem } from '../shared/models';
import { LocalStorageUtil } from '../shared/utils/local-storage';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  private readonly router = inject(Router);
  private readonly storedTodoList: TodoItem[] =
    LocalStorageUtil.getItem<TodoItem[]>(STORAGE_KEY.todo) || [];
  readonly slug = input.required<string>();

  todoItem = computed(() => {
    // Exact id from slug
    const splitIndex = this.slug().indexOf(STORAGE_KEY.todo + '_');
    const id = this.slug().substring(splitIndex);

    // Find todo item
    const todoItem = this.storedTodoList.find((item) => item.id === id);

    return todoItem;
  });

  _checkTodoItemUndefined = effect(() => {
    if (!this.todoItem()) {
      this.router.navigate(['/']);
    }
  });
}
