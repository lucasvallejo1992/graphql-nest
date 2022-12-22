import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Todo description' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  description: string;
}
