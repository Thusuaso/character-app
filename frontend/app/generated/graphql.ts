/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

function fetcher<TData, TVariables>(query: TypedDocumentString<unknown, unknown>, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  description: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Status;
};

export type CharacterFilterInput = {
  gender?: InputMaybe<Gender>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type Query = {
  __typename?: 'Query';
  characters: Array<Character>;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
};

export enum Status {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  Unknown = 'UNKNOWN'
}

export type CharacterFilterInput = {
  gender?: Gender | null | undefined;
  search?: string | null | undefined;
  status?: Status | null | undefined;
};

export type Gender =
  | 'FEMALE'
  | 'MALE'
  | 'UNKNOWN';

export type Status =
  | 'ALIVE'
  | 'DEAD'
  | 'UNKNOWN';

export type CharactersQueryVariables = Exact<{
  filter?: CharacterFilterInput | null | undefined;
}>;


export type CharactersQuery = { characters: Array<{ id: number, image: string, name: string, status: Status, gender: Gender, description: string }> };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CharactersDocument = new TypedDocumentString(`
    query Characters($filter: CharacterFilterInput) {
  characters(filter: $filter) {
    id
    image
    name
    status
    gender
    description
  }
}
    `);

export const useCharactersQuery = <
      TData = CharactersQuery,
      TError = unknown
    >(
      variables?: CharactersQueryVariables,
      options?: Omit<UseQueryOptions<CharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Characters'] : ['Characters', variables],
    queryFn: fetcher<CharactersQuery, CharactersQueryVariables>(CharactersDocument, variables),
    ...options
  }
    )};
