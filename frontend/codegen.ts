import type {CodegenConfig} from '@graphql-codegen/cli';
const config: CodegenConfig = {
    schema:'../backend/src/schema.gql',
    documents:'app/graphql/**/*.graphql',
    generates:{
        'app/generated/graphql.ts':{
            plugins:[
                'typescript',
                'typescript-operations',
                'typescript-react-query'
            ],

            config:{
                fetcher:{
                    endpoint:'http://localhost:4000/graphql',
                    fetchParams:{
                        headers:{
                            'Content-Type':'application/json'
                        }
                    }
                },
                reactQueryVersion:5,
            }
        
        }
    }
}

export default config;