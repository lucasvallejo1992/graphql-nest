import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Test todo 1', done: false },
    { id: 2, description: 'Test todo 2', done: true },
    { id: 3, description: 'Test todo 3', done: false },
    { id: 4, description: 'Test todo 4', done: true },
    { id: 5, description: 'Test todo 5', done: false },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get pendingTodos() {
    return this.todos.reduce((sum, _todo) => (!_todo.done ? sum + 1 : sum), 0);
  }

  get completedTodos() {
    return this.todos.reduce((sum, _todo) => (_todo.done ? sum + 1 : sum), 0);
  }

  findAll({ status }: StatusArgs): Todo[] {
    if (status !== undefined) {
      return this.todos.filter((_todo) => _todo.done === status);
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((_todo) => _todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with #${id} not found`);
    }

    return todo;
  }

  create(createTodoInput: CreateTodoInput) {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((_todo) => _todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const todoToUpdate = this.findOne(updateTodoInput.id);

    if (updateTodoInput.description) {
      todoToUpdate.description = updateTodoInput.description;
    }

    if (updateTodoInput.done !== undefined) {
      todoToUpdate.done = updateTodoInput.done;
    }

    this.todos = this.todos.map((_todo) =>
      _todo.id !== updateTodoInput.id ? _todo : todoToUpdate,
    );

    return todoToUpdate;
  }

  remove(id: number) {
    this.findOne(id);

    this.todos = this.todos.filter((_todo) => _todo.id !== id);

    return true;
  }
}
