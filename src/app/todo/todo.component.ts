import { Component, OnInit } from '@angular/core';
import last from 'lodash-es/last';

interface TodoItem {
  id: number;
  label: string;
  done: boolean;
  edit: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  list!: TodoItem[];
  filteredList!: TodoItem[];
  todoText!: string;

  ngOnInit(): void {
    this.list = this.getListFromLocalStorage();
    this.filteredList = this.list;
  }

  add(): void {
    if (!(this.todoText || '').trim()) {
      return;
    }
    let id = last(this.list)?.id;
    id = id ? id + 1 : 1;

    this.list = [...this.list, { id, label: this.todoText, done: false, edit: false }];
    this.filteredList = this.list;
    this.setListToLocalStorage(this.list);
    this.todoText = '';
  }

  done(): void {
    this.setListToLocalStorage(this.list);
  }

  edit(item: TodoItem): void {
    if (!this.isChecked(item)) {
      item.edit = true;
    }
  }

  save(item: TodoItem): void {
    if (!item.label) {
      return;
    }
    item.edit = false;
    this.setListToLocalStorage(this.list);
  }

  delete(item: TodoItem): void {
    this.list = this.list.map((i) => (i.id === item.id ? null : i)).filter(Boolean) as TodoItem[];
    this.filteredList = this.list;
    this.setListToLocalStorage(this.list);
  }

  isChecked(item: TodoItem): boolean {
    return item.done;
  }

  showAll(): void {
    this.filteredList = this.list;
  }

  showActive(): void {
    this.filteredList = this.list.filter(({ done }) => !done);
  }

  showInactive(): void {
    this.filteredList = this.list.filter(({ done }) => done);
  }

  private setListToLocalStorage(list: TodoItem[]): void {
    localStorage.setItem('todo', JSON.stringify(list));
  }

  private getListFromLocalStorage(): any[] {
    const list = localStorage.getItem('todo');
    return JSON.parse(list!) || [];
  }
}
