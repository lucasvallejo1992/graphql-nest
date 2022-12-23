import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'Todo description', nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  description?: string;

  @Field(() => Boolean, { description: 'Todo status', nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
