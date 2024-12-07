import { Component, input, output } from '@angular/core';
import { TodoItem } from '../../../shared/models';
import { RouterLink } from '@angular/router';
import { TODO_STATUS } from '../../../shared/constants';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  todoItem = input.required<TodoItem>();
  onDelete = output<string>();
  onChangeStatus = output<string>();
  readonly todoStatusComplete = TODO_STATUS.complete;
}
