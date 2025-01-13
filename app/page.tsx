"use client";

import { useQuery } from "@apollo/client";

import { ACCOUNT } from "@/lib/graphql";
import {
  AccountGraphqlType,
  VitaErrorGraphqlType,
} from "@/src/graphql/graphql";

export default function Home() {
  const { loading, error, data } = useQuery(ACCOUNT, {
    variables: { id: "id" },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (data.account.__typename == "VitaErrorGraphqlType") {
    const vitaError = data.account as VitaErrorGraphqlType;

    return (
      <>
        <div>{vitaError.message}</div>
      </>
    );
  } else {
    const account = data.account as AccountGraphqlType;

    return (
      <>
        <div>{account.name}</div>
      </>
    );
  }
}
