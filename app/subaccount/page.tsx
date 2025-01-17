"use client";

import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { columns } from "@/app/subaccount/columns";
import { DataTable } from "@/app/subaccount/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  CREATE_SUB_ACCOUNT,
  DELETE_SUB_ACCOUNT,
  SUB_ACCOUNTS,
  UPDATE_SUB_ACCOUNT,
} from "@/lib/graphql";
import { SubAccountGraphqlType } from "@/src/graphql/graphql";

const conditionFormSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  accountId: z.string().optional(),
});

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  accountId: z.string().optional(),
  createDate: z.string().optional(),
  createObjectId: z.string().optional(),
  updateDate: z.string().optional(),
  updateObjectId: z.string().optional(),
  deleteDate: z.string().optional(),
  deleteObjectId: z.string().optional(),
});

export default function Home() {
  const [isUpdate, setIsUpdate] = useState(false);

  const conditionForm = useForm<z.infer<typeof conditionFormSchema>>({
    resolver: zodResolver(conditionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      accountId: "",
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      accountId: "",
      createDate: undefined,
      createObjectId: undefined,
      updateDate: undefined,
      updateObjectId: undefined,
      deleteDate: undefined,
      deleteObjectId: undefined,
    },
  });

  const { loading, data, refetch } = useQuery(SUB_ACCOUNTS, {
    variables: conditionForm.getValues,
  });

  const [createSubAccount] = useMutation(CREATE_SUB_ACCOUNT);
  const [updateSubAccount] = useMutation(UPDATE_SUB_ACCOUNT);
  const [deleteSubAccount] = useMutation(DELETE_SUB_ACCOUNT);

  const defaultData: SubAccountGraphqlType[] = [
    {
      id: "1",
      name: "name1",
      description: "desc1",
      accountId: "1",
      createDate: "2024-01-01T12:00:00",
      createObjectId: "system",
      updateDate: "2024-01-01T12:00:00",
      updateObjectId: "system",
      deleteDate: "2024-01-01T12:00:00",
      deleteObjectId: "system",
    },
  ];

  function find(values: z.infer<typeof conditionFormSchema>) {
    refetch(values);
  }

  async function save(values: z.infer<typeof formSchema>) {
    try {
      if (isUpdate) {
        await updateSubAccount({
          variables: {
            id: values.id,
            name: values.name,
            description: values.description,
            accountId: values.accountId,
          },
        });
      } else {
        await createSubAccount({
          variables: {
            name: values.name,
            description: values.description,
            accountId: values.accountId,
          },
        });
      }

      // フォームをリセット
      form.reset();

      // 検索結果を更新
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  async function remove() {
    if (!form.getValues("id")) return;

    try {
      await deleteSubAccount({
        variables: {
          id: form.getValues("id"),
        },
      });

      // フォームをリセット
      form.reset();

      // 検索結果を更新
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return "Loading...";

  const subAccounts = !loading ? defaultData : data.subAccounts;

  const addedColumns: ColumnDef<SubAccountGraphqlType>[] = [
    ...columns,
    {
      id: "select",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            form.setValue("id", row.getValue("id"));
            form.setValue("name", row.getValue("name"));
            form.setValue("description", row.getValue("description"));
            form.setValue("accountId", row.getValue("accountId"));
            form.setValue("createDate", row.getValue("createDate"));
            form.setValue("createObjectId", row.getValue("createObjectId"));
            form.setValue("updateDate", row.getValue("updateDate"));
            form.setValue("updateObjectId", row.getValue("updateObjectId"));
            form.setValue("deleteDate", row.getValue("deleteDate"));
            form.setValue("deleteObjectId", row.getValue("deleteObjectId"));
          }}
        >
          Inner
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-flow-row-dense grid-cols-12 gap-4">
        <Card className="col-span-8">
          <CardHeader>
            <CardTitle>Condition</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...conditionForm}>
              <form onSubmit={conditionForm.handleSubmit(find)}>
                <FormField
                  control={conditionForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={conditionForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={conditionForm.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AccountId</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <DataTable columns={addedColumns} data={subAccounts!} />
          </CardFooter>
        </Card>
        <Card className="col-span-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(save)}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>SubAccount</CardTitle>
                <Toggle
                  pressed={isUpdate}
                  onPressedChange={setIsUpdate}
                  aria-label="Toggle edit mode"
                >
                  {isUpdate ? "Update" : "Create"}
                </Toggle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AccountId</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="space-y-4 border-t pt-4">
                  <FormField
                    control={form.control}
                    name="createDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-[0.3]">作成日時</FormLabel>
                        <div className="flex-[0.7] text-sm text-muted-foreground">
                          {field.value || "-"}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="createObjectId"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-[0.3]">作成者</FormLabel>
                        <div className="flex-[0.7] text-sm text-muted-foreground">
                          {field.value || "-"}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="updateDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-[0.3]">更新日時</FormLabel>
                        <div className="flex-[0.7] text-sm text-muted-foreground">
                          {field.value || "-"}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="updateObjectId"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-[0.3]">更新者</FormLabel>
                        <div className="flex-[0.7] text-sm text-muted-foreground">
                          {field.value || "-"}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deleteDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-[0.3]">削除日時</FormLabel>
                        <div className="flex-[0.7] text-sm text-muted-foreground">
                          {field.value || "-"}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deleteObjectId"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-[0.3]">削除者</FormLabel>
                        <div className="flex-[0.7] text-sm text-muted-foreground">
                          {field.value || "-"}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit">{isUpdate ? "Update" : "Create"}</Button>
                <Button type="button" variant="destructive" onClick={remove}>
                  Delete
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
