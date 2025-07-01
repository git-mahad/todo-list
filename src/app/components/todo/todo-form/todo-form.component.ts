import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      targetDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const newTodo = {
        ...this.todoForm.value,
        completed: false
      };

      this.todoService.addTodo(newTodo);
      this.todoCreated.emit();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
