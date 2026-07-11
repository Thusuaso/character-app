import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import {AppResolver} from './app.resolver';
import {PrismaModule} from './prisma/prisma.module';
import {CharacterModule} from './character/character.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,


    }),


    PrismaModule,
    CharacterModule,
  ],
})
export class AppModule {}