import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
  @Query(() => String)
  example(): string {
    return 'This is a test';
  }
}
