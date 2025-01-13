import {
  ApolloClient,
  ApolloQueryResult,
  InMemoryCache,
  gql,
} from "@apollo/client";

export function getClient() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });
  return client;
}

export async function unwrap(result: ApolloQueryResult<any>, name: string) {
  return result.data[name];
}

export const ACCOUNT = gql`
  query Account($id: String!) {
    account(input: { id: $id }) {
      ... on AccountGraphqlType {
        id
        name
        description
        dept
        bsPl
        creditDebit
        createDate
        createObjectId
        updateDate
        updateObjectId
        deleteDate
        deleteObjectId
      }
      ... on VitaErrorGraphqlType {
        errorCode
        message
      }
      __typename
    }
  }
`;

export const ACCOUNTS = gql`
  query Accounts(
    $name: String
    $description: String
    $bsPl: BsPlEnum
    $creditDebit: CreditDebitEnum
    $dept: DeptEnum
  ) {
    accounts(
      input: {
        name: $name
        description: $description
        bsPl: $bsPl
        creditDebit: $creditDebit
        dept: $dept
      }
    ) {
      id
      name
      description
      dept
      bsPl
      creditDebit
      createDate
      createObjectId
      updateDate
      updateObjectId
      deleteDate
      deleteObjectId
      __typename
    }
  }
`;
