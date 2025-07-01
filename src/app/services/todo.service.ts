import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([
    {
      id: 1,
      description: 'Become an expert at Angular',
      targetDate: '2020-05-04',
      completed: true
    },
    {
      id: 2,
      description: 'Become an expert at Node.js',
      targetDate: '2020-05-04',
      completed: false
    },
    {
      id: 3,
      description: 'Learn Reactjs',
      targetDate: '2020-05-04',
      completed: false
    },
    {
      id: 4,
      description: 'Learn Ansible',
      targetDate: '2020-05-04',
      completed: false
    }
  ]);

  public todos$ = this.todosSubject.asObservable();

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(todo: Todo): void {
    const currentTodos = this.todosSubject.value;
    const newTodo = { ...todo, id: Date.now() };
    this.todosSubject.next([...currentTodos, newTodo]);
  }

  updateTodo(id: number, updatedTodo: Partial<Todo>): void {
    const currentTodos = this.todosSubject.value;
    const index = currentTodos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      currentTodos[index] = { ...currentTodos[index], ...updatedTodo };
      this.todosSubject.next([...currentTodos]);
    }
  }

  deleteTodo(id: number): void {
    const currentTodos = this.todosSubject.value;
    const filteredTodos = currentTodos.filter(todo => todo.id !== id);
    this.todosSubject.next(filteredTodos);
  }

  toggleComplete(id: number): void {
    const currentTodos = this.todosSubject.value;
    const todo = currentTodos.find(t => t.id === id);
    if (todo) {
      this.updateTodo(id, { completed: !todo.completed });
    }
  }
}