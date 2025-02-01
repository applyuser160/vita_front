"use client";

import { ColumnDef } from "@tanstack/react-table";

import { JournalEntryGraphqlType } from "@/src/graphql/graphql";

export const columns: ColumnDef<JournalEntryGraphqlType>[] = [
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
    accessorKey: "targetDate",
    header: "TargetDate",
  },
  {
    accessorKey: "status",
    header: "Status",
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
