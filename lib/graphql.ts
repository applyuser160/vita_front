import {
  ApolloClient,
  ApolloQueryResult,
  InMemoryCache,
  gql,
} from "@apollo/client";

import * as types from "@/src/graphql/graphql";

export function getClient() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/",
    cache: new InMemoryCache(),
  });
  return client;
}

export async function unwrap(result: ApolloQueryResult<any>, name: string) {
  return result.data[name];
}

export async function getAccount(
  id: string
): Promise<types.AccountGraphqlType | types.VitaErrorGraphqlType> {
  const name = "account";

  const result = await getClient().query({
    query: gql`
      query {
        ${name}(input:{id: "${id}"}){
          ... on AccountGraphqlType{
            id, name, description, dept, bsPl, creditDebit
            createDate, createObjectId, updateDate, updateObjectId
            deleteDate, deleteObjectId
          }
          ... on VitaErrorGraphqlType{
            errorCode, message
          }
          __typename
        }
      }
    `,
  });

  return unwrap(result, name);
}
