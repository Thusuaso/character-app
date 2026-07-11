import {Resolver,Query,Args} from '@nestjs/graphql';
import {Character} from './character.model';
import {CharacterService} from './character.service'
import {CharacterFilterInput} from './character.filter.input';


@Resolver(()=>Character)

export class CharacterResolver{
    constructor(private readonly characterService:CharacterService){}
    @Query(()=>[ Character])

    characters(
        @Args('filter',{nullable:true}) filter:CharacterFilterInput 
    ){
        return this.characterService.findAll(filter)
    }
}
