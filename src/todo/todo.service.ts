import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [{ id: 1, description: 'Test todo', done: false }];

  findAll(): Todo[] {
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
    const todo = this.findOne(id);

    this.todos = this.todos.filter((_todo) => _todo.id !== id);
  }
}
