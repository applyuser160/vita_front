"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SubAccountGraphqlType } from "@/src/graphql/graphql";

export const columns: ColumnDef<SubAccountGraphqlType>[] = [
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
    accessorKey: "accountId",
    header: "AccountId",
  },
  {
    accessorKey: "createDate",
    header: "CreateDate",
  },
  {
    accessorKey: "createObjectId",
    header: "CreateObjectId",
    enableHiding: true,
  },
  {
    accessorKey: "updateDate",
    header: "UpdateDate",
  },
  {
    accessorKey: "updateObjectId",
    header: "UpdateObjectId",
    enableHiding: true,
  },
  {
    accessorKey: "deleteDate",
    header: "DeleteDate",
  },
  {
    accessorKey: "deleteObjectId",
    header: "DeleteObjectId",
    enableHiding: true,
  },
];
