import {InputType,Field} from '@nestjs/graphql';
import {Status,Gender } from '../generated/prisma/client';

@InputType()

export class CharacterFilterInput{
    @Field(()=>Status,{nullable:true})
    status?:Status
    @Field(()=>Gender,{nullable:true})
    gender?:Gender
    @Field({nullable:true})
    search?:string
}