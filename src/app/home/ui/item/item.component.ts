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
  readonly todoItem = input.required<TodoItem>();
  readonly onDelete = output<string>();
  readonly onChangeStatus = output<string>();
  readonly todoStatusComplete = TODO_STATUS.complete;
}
