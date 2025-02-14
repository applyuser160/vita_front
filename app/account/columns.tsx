"use client";

import { ColumnDef } from "@tanstack/react-table";

import { AccountGraphqlType } from "@/src/graphql/graphql";

export const columns: ColumnDef<AccountGraphqlType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "bsPl",
    header: "BS/PL",
  },
  {
    accessorKey: "creditDebit",
    header: "Credit/Debit",
  },
  {
    accessorKey: "dept",
    header: "Dept",
  },
  {
    accessorKey: "createDate",
    header: "CreateDate",
  },
  {
    accessorKey: "createObjectId",
    header: "CreateObjectId",
  },
];
