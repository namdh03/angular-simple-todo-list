import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageUtil } from '../../../shared/utils/local-storage';
import { STORAGE_KEY, TODO_STATUS } from '../../../shared/constants';
import { TodoItem } from '../../../shared/models';
import { ItemComponent } from "../item/item.component";

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
  private readonly storedTodoList =
    LocalStorageUtil.getItem<TodoItem[]>(STORAGE_KEY.todo) || [];
  todoList = signal<TodoItem[]>([]);

  ngOnInit(): void {
    const subscription = this.activatedRoute.url.subscribe({
      next: (segments) => {
        const currentRoute =
          segments?.[0]?.path || TODO_STATUS.all.toLowerCase();
        this.updateTodoList(currentRoute);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private updateTodoList(status: string): void {
    if (status === TODO_STATUS.all.toLowerCase()) {
      this.todoList.set(this.storedTodoList);
    } else {
      this.todoList.set(
        this.storedTodoList.filter(
          (item) => item.status.toLowerCase() === status
        )
      );
    }
  }
}
