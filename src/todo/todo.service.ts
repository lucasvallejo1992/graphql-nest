import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [{ id: 1, description: 'Test todo', done: false }];

  create() {
    return undefined;
  }

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

  update() {
    return undefined;
  }

  remove(id: number) {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((_todo) => _todo.id !== id);
  }
}
