import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Todo } from '../../../models/todo.model';
import { TodoService } from '../../../services/todo.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TodoFormComponent, DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  showCreateForm = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  toggleComplete(id: number): void {
    this.todoService.toggleComplete(id);
  }

  updateTodo(todo: Todo): void {
    const newDescription = prompt('Update description:', todo.description);
    if (newDescription && newDescription !== todo.description) {
      this.todoService.updateTodo(todo.id!, { description: newDescription });
    }
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id);
    }
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  onTodoCreated(): void {
    this.showCreateForm = false;
  }
}
