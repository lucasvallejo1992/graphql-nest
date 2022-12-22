import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    return this.todoService.findOne(id);
  }

  updateTodo() {
    return '';
  }

  removeTodo() {
    return '';
  }
}
