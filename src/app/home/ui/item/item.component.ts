import { Component, input } from '@angular/core';
import { TodoItem } from '../../../shared/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  todoItem = input.required<TodoItem>();
}
