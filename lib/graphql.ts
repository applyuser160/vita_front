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

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $name: String
    $description: String
    $bsPl: BsPlEnum
    $creditDebit: CreditDebitEnum
    $dept: DeptEnum
  ) {
    createAccount(
      input: {
        name: $name
        description: $description
        bsPl: $bsPl
        creditDebit: $creditDebit
        dept: $dept
      }
    ) {
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

export const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount(
    $id: String!
    $name: String
    $description: String
    $bsPl: BsPlEnum
    $creditDebit: CreditDebitEnum
    $dept: DeptEnum
  ) {
    updateAccount(
      input: {
        id: $id
        name: $name
        description: $description
        bsPl: $bsPl
        creditDebit: $creditDebit
        dept: $dept
      }
    ) {
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

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: String!) {
    deleteAccount(input: { id: $id }) {
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

export const SUB_ACCOUNT = gql`
  query SubAccount($id: String!) {
    subAccount(input: { id: $id }) {
      ... on SubAccountGraphqlType {
        id
        name
        description
        accountId
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

export const SUB_ACCOUNTS = gql`
  query SubAccounts($name: String, $description: String, $accountId: String) {
    subAccounts(
      input: { name: $name, description: $description, accountId: $accountId }
    ) {
      id
      name
      description
      accountId
      createDate
      createObjectId
      updateDate
      updateObjectId
      deleteDate
      deleteObjectId
    }
  }
`;

export const CREATE_SUB_ACCOUNT = gql`
  mutation CreateSubAccount(
    $name: String!
    $description: String
    $accountId: String!
  ) {
    createSubAccount(
      input: { name: $name, description: $description, accountId: $accountId }
    ) {
      ... on SubAccountGraphqlType {
        id
        name
        description
        accountId
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

export const UPDATE_SUB_ACCOUNT = gql`
  mutation UpdateSubAccount(
    $id: String!
    $name: String
    $description: String
    $accountId: String!
  ) {
    updateSubAccount(
      input: {
        id: $id
        name: $name
        description: $description
        accountId: $accountId
      }
    ) {
      ... on SubAccountGraphqlType {
        id
        name
        description
        accountId
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

export const DELETE_SUB_ACCOUNT = gql`
  mutation DeleteSubAccount($id: String!) {
    deleteSubAccount(input: { id: $id }) {
      ... on SubAccountGraphqlType {
        id
        name
        description
        accountId
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

export const JOURNAL_ENTRY = gql`
  query JournalEntry($id: String!) {
    journalEntry(input: { id: $id }) {
      ... on JournalEntryGraphqlType {
        id
        name
        description
        targetDate
        status
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

export const JOURNAL_ENTRIES = gql`
  query JournalEntries(
    $name: String
    $description: String
    $fromDate: Date
    $toDate: Date
    $status: StatusEnum
    $accountId: String
    $subAccountId: String
  ) {
    journalEntries(
      input: {
        name: $name
        description: $description
        fromDate: $fromDate
        toDate: $toDate
        status: $status
        accountId: $accountId
        subAccountId: $subAccountId
      }
    ) {
      id
      name
      description
      targetDate
      status
      createDate
      createObjectId
      updateDate
      updateObjectId
      deleteDate
      deleteObjectId
    }
  }
`;

export const CREATE_JOURNAL_ENTRY = gql`
  mutation CreateJournalEntry(
    $name: String
    $description: String
    $targetDate: Date!
    $status: StatusEnum!
  ) {
    createJournalEntry(
      input: {
        name: $name
        description: $description
        targetDate: $targetDate
        status: $status
      }
    ) {
      ... on JournalEntryGraphqlType {
        id
        name
        description
        targetDate
        status
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

export const UPDATE_JOURNAL_ENTRY = gql`
  mutation UpdateJournalEntry(
    $id: String!
    $name: String
    $description: String
    $targetDate: Date
    $status: StatusEnum
  ) {
    updateJournalEntry(
      input: {
        id: $id
        name: $name
        description: $description
        targetDate: $targetDate
        status: $status
      }
    ) {
      ... on JournalEntryGraphqlType {
        id
        name
        description
        targetDate
        status
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

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($id: String!) {
    deleteJournalEntry(input: { id: $id }) {
      ... on JournalEntryGraphqlType {
        id
        name
        description
        targetDate
        status
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

export const COLLECT_JOURNAL_ENTRIES = gql`
  query CollectJournalEntries(
    $accountIds: [String!]
    $subAccountIds: [String!]
    $fromDate: Date
    $toDate: Date
  ) {
    collectJournalEntries(
      input: {
        accountIds: $accountIds
        subAccountIds: $subAccountIds
        fromDate: $fromDate
        toDate: $toDate
      }
    ) {
      id
      journalEntryId
      accountId
      subAccountId
      amount
      creditDebit
      index
      createDate
      createObjectId
      updateDate
      updateObjectId
      deleteDate
      deleteObjectId
    }
  }
`;

export const CALCULATE_BALANCE = gql`
  query CalculateBalance(
    $accountIds: [String!]
    $subAccountIds: [String!]
    $fromDate: Date
    $toDate: Date
  ) {
    calculateBalance(
      input: {
        accountIds: $accountIds
        subAccountIds: $subAccountIds
        fromDate: $fromDate
        toDate: $toDate
      }
    ) {
      id
      accountId
      subAccountId
      totalAmount
      createDate
      createObjectId
      updateDate
      updateObjectId
      deleteDate
      deleteObjectId
    }
  }
`;

export const CALCULATE_DAILY_BALANCE = gql`
  query CalculateDailyBalance(
    $accountIds: [String!]
    $subAccountIds: [String!]
    $fromDate: Date
    $toDate: Date
  ) {
    calculateDailyBalance(
      input: {
        accountIds: $accountIds
        subAccountIds: $subAccountIds
        fromDate: $fromDate
        toDate: $toDate
      }
    ) {
      id
      accountId
      subAccountId
      targetDate
      totalAmount
      createDate
      createObjectId
      updateDate
      updateObjectId
      deleteDate
      deleteObjectId
    }
  }
`;
