import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private storedTodoList: TodoItem[] =
    LocalStorageUtil.getItem<TodoItem[]>(STORAGE_KEY.todo) || [];
  private currentRoute: string = TODO_STATUS.all.toLowerCase();
  todoList = signal<TodoItem[]>([]);

  ngOnInit(): void {
    const urlSubscription = this.activatedRoute.url.subscribe({
      next: (segments) => {
        this.currentRoute =
          segments?.[0]?.path || TODO_STATUS.all.toLowerCase();
        this.updateTodoList(this.currentRoute);
      },
    });

    const queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const searchQuery = params['search'] || '';
        this.updateTodoList(this.currentRoute, searchQuery);
      }
    );

    this.destroyRef.onDestroy(() => {
      urlSubscription.unsubscribe();
      queryParamsSubscription.unsubscribe();
    });
  }

  handleDelete(id: string): void {
    this.storedTodoList = this.storedTodoList.filter((item) => item.id !== id);
    LocalStorageUtil.setItem(STORAGE_KEY.todo, this.storedTodoList);
    this.updateTodoList(this.currentRoute);
  }

  handleChangeStatus(id: string): void {
    this.storedTodoList = this.storedTodoList.map((item) =>
      item.id === id
        ? {
            ...item,
            status:
              item.status === TODO_STATUS.planning
                ? TODO_STATUS.processing
                : item.status === TODO_STATUS.processing
                ? TODO_STATUS.complete
                : TODO_STATUS.complete,
          }
        : item
    );
    LocalStorageUtil.setItem(STORAGE_KEY.todo, this.storedTodoList);
    this.updateTodoList(this.currentRoute);
  }

  private updateTodoList(status: string, searchQuery: string = ''): void {
    let filteredList =
      status === TODO_STATUS.all.toLowerCase()
        ? this.storedTodoList
        : this.storedTodoList.filter(
            (item) => item.status.toLowerCase() === status
          );

    if (searchQuery.trim()) {
      filteredList = filteredList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    this.todoList.set(filteredList);
  }
}
