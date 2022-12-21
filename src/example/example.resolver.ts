import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
  @Query(() => String, {
    name: 'example',
    description: 'This returns a plain test text',
  })
  example(): string {
    return 'This is a test';
  }

  @Query(() => Float, {
    name: 'getRandomNumber',
    description: 'Generates a random number',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'getRandomNumberFromZeroTo',
    description: 'Generates a random number from 0 to N',
  })
  getRandomNumberFromZeroTo(
    @Args('to', { type: () => Int })
    to: number,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
