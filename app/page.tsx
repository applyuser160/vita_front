"use client";

import { useEffect, useState } from "react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { getAccount } from "@/lib/graphql";
import {
  AccountGraphqlType,
  VitaErrorGraphqlType,
} from "@/src/graphql/graphql";

export default function Home() {
  const [account, setAccount] = useState<AccountGraphqlType>();
  const [error, setError] = useState<VitaErrorGraphqlType>();

  useEffect(() => {
    (async () => {
      const result = await getAccount("");

      switch (result.__typename) {
        case "AccountGraphqlType":
          setAccount(result);
          break;
        case "VitaErrorGraphqlType":
          setError(result);
          break;
      }
    })();
  }, []);

  return (
    <>
      <ModeToggle />
      <div>{account?.name}</div>
      <div>{error?.message}</div>
    </>
  );
}
