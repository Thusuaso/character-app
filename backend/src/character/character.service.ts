import {Injectable} from '@nestjs/common'
import {PrismaService} from '../prisma/prisma.service'
import {CharacterFilterInput} from './character.filter.input'
import {Prisma} from '../generated/prisma/client';

@Injectable()
export class CharacterService{
    constructor(private readonly prisma:PrismaService){}

    findAll(filter:CharacterFilterInput){
        const where: Prisma.CharacterWhereInput = {}
        if(filter?.status){
            where.status = filter.status
        }
        if(filter?.gender){
            where.gender = filter.gender
        }

        if(filter?.search){
            where.OR = [
                {name:{contains:filter.search}},
                {description:{contains:filter.search}}
            ]
        }
        return this.prisma.character.findMany({where})
    }
}
