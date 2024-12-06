import { TODO_STATUS } from '../constants';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  content: string;
  status: TODO_STATUS;
}
