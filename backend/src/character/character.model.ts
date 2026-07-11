import  {ObjectType,Field,Int,registerEnumType} from '@nestjs/graphql';
import {Status,Gender} from '../generated/prisma/client';

registerEnumType(Status,{name:'Status'})
registerEnumType(Gender,{name:'Gender'})

@ObjectType()
export class Character{

    @Field(()=>Int)
    id!:number

    @Field()
    image!:string

    @Field()
    name!:string

    @Field(()=>Status)
    status!:Status

    @Field(() =>Gender)
    gender!:Gender

    @Field()
    description!:string



}