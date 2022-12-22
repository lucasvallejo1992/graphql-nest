import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';

@Resolver()
export class TodoResolver {
  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return [{ id: 1, description: 'Test', done: false }];
  }

  findOne() {
    return '';
  }

  updateTodo() {
    return '';
  }

  removeTodo() {
    return '';
  }
}
