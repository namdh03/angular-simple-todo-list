import { Component, inject, input, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { LocalStorageUtil } from '../../../shared/utils/local-storage';
import { STORAGE_KEY, TODO_STATUS } from '../../../shared/constants';
import { TodoItem } from '../../../shared/models';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private storedTodoList = signal<TodoItem[]>(
    LocalStorageUtil.getItem<TodoItem[]>(STORAGE_KEY.todo) || []
  );
  readonly search = input.required<string>();

  private readonly currentRoute = toSignal(
    this.activatedRoute.url.pipe(map((segments) => segments[0]?.path)),
    { initialValue: TODO_STATUS.all }
  );

  todoList = computed(() => {
    const currentRoute = this.currentRoute()?.toLowerCase() || TODO_STATUS.all;
    const searchQuery = this.search()?.toLowerCase();

    return this.storedTodoList().filter((item) => {
      const title = item.title.toLowerCase();
      const status = item.status.toLowerCase();

      const matchesSearch = !searchQuery || title.includes(searchQuery);
      const matchesRoute =
        currentRoute === TODO_STATUS.all || status === currentRoute;

      return matchesSearch && matchesRoute;
    });
  });

  handleDelete(id: string): void {
    this.storedTodoList.update((prevList) =>
      prevList.filter((item) => item.id !== id)
    );
    LocalStorageUtil.setItem(STORAGE_KEY.todo, this.storedTodoList());
  }

  handleChangeStatus(id: string): void {
    this.storedTodoList.update((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, status: this.getNextStatus(item.status) }
          : item
      )
    );
    LocalStorageUtil.setItem(STORAGE_KEY.todo, this.storedTodoList());
  }

  private getNextStatus(currentStatus: string): TODO_STATUS {
    switch (currentStatus) {
      case TODO_STATUS.planning:
        return TODO_STATUS.processing;
      case TODO_STATUS.processing:
        return TODO_STATUS.complete;
      default:
        return TODO_STATUS.complete;
    }
  }
}
