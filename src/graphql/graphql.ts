/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date (isoformat) */
  Date: { input: any; output: any };
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any };
};

export type AccountGraphqlInput = {
  bsPl: BsPlEnum;
  createDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  createObjectId?: InputMaybe<Scalars["String"]["input"]>;
  creditDebit: CreditDebitEnum;
  deleteDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  deleteObjectId?: InputMaybe<Scalars["String"]["input"]>;
  dept: DeptEnum;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  updateDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  updateObjectId?: InputMaybe<Scalars["String"]["input"]>;
};

export type AccountGraphqlType = {
  __typename?: "AccountGraphqlType";
  bsPl: BsPlEnum;
  createDate?: Maybe<Scalars["DateTime"]["output"]>;
  createObjectId?: Maybe<Scalars["String"]["output"]>;
  creditDebit: CreditDebitEnum;
  deleteDate?: Maybe<Scalars["DateTime"]["output"]>;
  deleteObjectId?: Maybe<Scalars["String"]["output"]>;
  dept: DeptEnum;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updateDate?: Maybe<Scalars["DateTime"]["output"]>;
  updateObjectId?: Maybe<Scalars["String"]["output"]>;
};

export type AccountGraphqlTypeVitaErrorGraphqlType =
  | AccountGraphqlType
  | VitaErrorGraphqlType;

export type AccountsGraphqlInput = {
  bsPl?: InputMaybe<BsPlEnum>;
  creditDebit?: InputMaybe<CreditDebitEnum>;
  dept?: InputMaybe<DeptEnum>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type BalanceGraphqlType = {
  __typename?: "BalanceGraphqlType";
  accountId?: Maybe<Scalars["String"]["output"]>;
  createDate?: Maybe<Scalars["DateTime"]["output"]>;
  createObjectId?: Maybe<Scalars["String"]["output"]>;
  deleteDate?: Maybe<Scalars["DateTime"]["output"]>;
  deleteObjectId?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  subAccountId?: Maybe<Scalars["String"]["output"]>;
  totalAmount: Scalars["Int"]["output"];
  updateDate?: Maybe<Scalars["DateTime"]["output"]>;
  updateObjectId?: Maybe<Scalars["String"]["output"]>;
};

export enum BsPlEnum {
  Bs = "BS",
  Pl = "PL",
}

export type CollectJournalEntriesGraphqlInput = {
  accountIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  fromDate?: InputMaybe<Scalars["Date"]["input"]>;
  subAccountIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  toDate?: InputMaybe<Scalars["Date"]["input"]>;
};

export enum CreditDebitEnum {
  Credit = "CREDIT",
  Debit = "DEBIT",
}

export type DailyBalanceGraphqlType = {
  __typename?: "DailyBalanceGraphqlType";
  accountId?: Maybe<Scalars["String"]["output"]>;
  createDate?: Maybe<Scalars["DateTime"]["output"]>;
  createObjectId?: Maybe<Scalars["String"]["output"]>;
  date: Scalars["Date"]["output"];
  deleteDate?: Maybe<Scalars["DateTime"]["output"]>;
  deleteObjectId?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  subAccountId?: Maybe<Scalars["String"]["output"]>;
  totalAmount: Scalars["Int"]["output"];
  updateDate?: Maybe<Scalars["DateTime"]["output"]>;
  updateObjectId?: Maybe<Scalars["String"]["output"]>;
};

export enum DeptEnum {
  CurrentAssets = "CURRENT_ASSETS",
  DeferredAssets = "DEFERRED_ASSETS",
  ExtraordinaryLosses = "EXTRAORDINARY_LOSSES",
  ExtraOrdinaryGains = "EXTRA_ORDINARY_GAINS",
  FixedLiability = "FIXED_LIABILITY",
  IntangibleAssets = "INTANGIBLE_ASSETS",
  Inventory = "INVENTORY",
  NonOperatingExpenses = "NON_OPERATING_EXPENSES",
  NonOperatingIncome = "NON_OPERATING_INCOME",
  OtherCurrentAssets = "OTHER_CURRENT_ASSETS",
  OtherCurrentLiabilities = "OTHER_CURRENT_LIABILITIES",
  PropertyPlantAndEquipment = "PROPERTY_PLANT_AND_EQUIPMENT",
  PurchaseDebt = "PURCHASE_DEBT",
  Sales = "SALES",
  SalesClaim = "SALES_CLAIM",
  SalesManagementExpenses = "SALES_MANAGEMENT_EXPENSES",
}

export type InnerJournalEntryGraphqlType = {
  __typename?: "InnerJournalEntryGraphqlType";
  accountId: Scalars["String"]["output"];
  amount: Scalars["Int"]["output"];
  createDate?: Maybe<Scalars["DateTime"]["output"]>;
  createObjectId?: Maybe<Scalars["String"]["output"]>;
  creditDebit: CreditDebitEnum;
  deleteDate?: Maybe<Scalars["DateTime"]["output"]>;
  deleteObjectId?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  index?: Maybe<Scalars["Int"]["output"]>;
  journalEntryId: Scalars["String"]["output"];
  subAccountId: Scalars["String"]["output"];
  updateDate?: Maybe<Scalars["DateTime"]["output"]>;
  updateObjectId?: Maybe<Scalars["String"]["output"]>;
};

export type JournalEntriesGraphqlInput = {
  accountId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  fromDate?: InputMaybe<Scalars["Date"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<StatusEnum>;
  subAccountId?: InputMaybe<Scalars["String"]["input"]>;
  toDate?: InputMaybe<Scalars["Date"]["input"]>;
};

export type JournalEntryGraphqlInput = {
  createDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  createObjectId?: InputMaybe<Scalars["String"]["input"]>;
  date: Scalars["Date"]["input"];
  deleteDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  deleteObjectId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  status: StatusEnum;
  updateDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  updateObjectId?: InputMaybe<Scalars["String"]["input"]>;
};

export type JournalEntryGraphqlType = {
  __typename?: "JournalEntryGraphqlType";
  createDate?: Maybe<Scalars["DateTime"]["output"]>;
  createObjectId?: Maybe<Scalars["String"]["output"]>;
  date: Scalars["Date"]["output"];
  deleteDate?: Maybe<Scalars["DateTime"]["output"]>;
  deleteObjectId?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  status: StatusEnum;
  updateDate?: Maybe<Scalars["DateTime"]["output"]>;
  updateObjectId?: Maybe<Scalars["String"]["output"]>;
};

export type JournalEntryGraphqlTypeVitaErrorGraphqlType =
  | JournalEntryGraphqlType
  | VitaErrorGraphqlType;

export type Mutation = {
  __typename?: "Mutation";
  createAccount: AccountGraphqlTypeVitaErrorGraphqlType;
  createJournalEntry: JournalEntryGraphqlTypeVitaErrorGraphqlType;
  createSubAccount: SubAccountGraphqlTypeVitaErrorGraphqlType;
  deleteAccount: AccountGraphqlTypeVitaErrorGraphqlType;
  deleteJournalEntry: JournalEntryGraphqlTypeVitaErrorGraphqlType;
  deleteSubAccount: SubAccountGraphqlTypeVitaErrorGraphqlType;
  updateAccount: AccountGraphqlTypeVitaErrorGraphqlType;
  updateJournalEntry: JournalEntryGraphqlTypeVitaErrorGraphqlType;
  updateSubAccount: SubAccountGraphqlTypeVitaErrorGraphqlType;
};

export type MutationCreateAccountArgs = {
  input: AccountGraphqlInput;
};

export type MutationCreateJournalEntryArgs = {
  input: JournalEntryGraphqlInput;
};

export type MutationCreateSubAccountArgs = {
  input: SubAccountGraphqlInput;
};

export type MutationDeleteAccountArgs = {
  input: AccountGraphqlInput;
};

export type MutationDeleteJournalEntryArgs = {
  input: JournalEntryGraphqlInput;
};

export type MutationDeleteSubAccountArgs = {
  input: SubAccountGraphqlInput;
};

export type MutationUpdateAccountArgs = {
  input: AccountGraphqlInput;
};

export type MutationUpdateJournalEntryArgs = {
  input: JournalEntryGraphqlInput;
};

export type MutationUpdateSubAccountArgs = {
  input: SubAccountGraphqlInput;
};

export type Query = {
  __typename?: "Query";
  account: AccountGraphqlTypeVitaErrorGraphqlType;
  accounts: Array<AccountGraphqlType>;
  calculateBalance: Array<BalanceGraphqlType>;
  calculateDailyBalance: Array<DailyBalanceGraphqlType>;
  collectJournalEntries: Array<InnerJournalEntryGraphqlType>;
  journalEntries: Array<JournalEntryGraphqlType>;
  journalEntry: JournalEntryGraphqlTypeVitaErrorGraphqlType;
  subAccount: SubAccountGraphqlTypeVitaErrorGraphqlType;
  subAccounts: Array<SubAccountGraphqlType>;
};

export type QueryAccountArgs = {
  input: SingleGraphqlInput;
};

export type QueryAccountsArgs = {
  input: AccountsGraphqlInput;
};

export type QueryCalculateBalanceArgs = {
  input: CollectJournalEntriesGraphqlInput;
};

export type QueryCalculateDailyBalanceArgs = {
  input: CollectJournalEntriesGraphqlInput;
};

export type QueryCollectJournalEntriesArgs = {
  input: CollectJournalEntriesGraphqlInput;
};

export type QueryJournalEntriesArgs = {
  input: JournalEntriesGraphqlInput;
};

export type QueryJournalEntryArgs = {
  input: SingleGraphqlInput;
};

export type QuerySubAccountArgs = {
  input: SingleGraphqlInput;
};

export type QuerySubAccountsArgs = {
  input: SubAccountsGraphqlInput;
};

export type SingleGraphqlInput = {
  id: Scalars["String"]["input"];
};

export enum StatusEnum {
  Fixed = "FIXED",
  Resolved = "RESOLVED",
  Unfixed = "UNFIXED",
}

export type SubAccountGraphqlInput = {
  accountId: Scalars["String"]["input"];
  createDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  createObjectId?: InputMaybe<Scalars["String"]["input"]>;
  deleteDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  deleteObjectId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  updateDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  updateObjectId?: InputMaybe<Scalars["String"]["input"]>;
};

export type SubAccountGraphqlType = {
  __typename?: "SubAccountGraphqlType";
  accountId: Scalars["String"]["output"];
  createDate?: Maybe<Scalars["DateTime"]["output"]>;
  createObjectId?: Maybe<Scalars["String"]["output"]>;
  deleteDate?: Maybe<Scalars["DateTime"]["output"]>;
  deleteObjectId?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updateDate?: Maybe<Scalars["DateTime"]["output"]>;
  updateObjectId?: Maybe<Scalars["String"]["output"]>;
};

export type SubAccountGraphqlTypeVitaErrorGraphqlType =
  | SubAccountGraphqlType
  | VitaErrorGraphqlType;

export type SubAccountsGraphqlInput = {
  accountId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type VitaErrorGraphqlType = {
  __typename?: "VitaErrorGraphqlType";
  errorCode: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
};
