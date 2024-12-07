import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class DetailComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private storedTodoList: TodoItem[] =
    LocalStorageUtil.getItem<TodoItem[]>(STORAGE_KEY.todo) || [];
  todoItem = signal<TodoItem | undefined>(undefined);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (value) => {
        const splitIndex = value['slug'].indexOf(STORAGE_KEY.todo + '_');
        const id = value['slug'].substring(splitIndex);
        const todoItem = this.storedTodoList.find((item) => item.id === id);

        if (!todoItem) this.router.navigate(['/']);

        this.todoItem.set(todoItem);
      },
    });
  }
}
