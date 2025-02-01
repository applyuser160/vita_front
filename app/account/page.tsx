"use client";

import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { columns } from "@/app/account/columns";
import { DataTable } from "@/app/account/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import {
  ACCOUNTS,
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
} from "@/lib/graphql";
import {
  AccountGraphqlType,
  BsPlEnum,
  CreditDebitEnum,
  DeptEnum,
} from "@/src/graphql/graphql";

const conditionFormSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  dept: z.string().optional(),
  bsPl: z.string().optional(),
  creditDebit: z.string().optional(),
});

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  dept: z.string().optional(),
  bsPl: z.string().optional(),
  creditDebit: z.string().optional(),
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
      dept: undefined,
      bsPl: undefined,
      creditDebit: undefined,
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      dept: undefined,
      bsPl: undefined,
      creditDebit: undefined,
      createDate: undefined,
      createObjectId: undefined,
      updateDate: undefined,
      updateObjectId: undefined,
      deleteDate: undefined,
      deleteObjectId: undefined,
    },
  });

  const { loading, data, refetch } = useQuery(ACCOUNTS, {
    variables: conditionForm.getValues,
    fetchPolicy: "cache-and-network",
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT);

  const defaultData: AccountGraphqlType[] = [
    {
      id: "1",
      name: "name1",
      description: "desc1",
      bsPl: BsPlEnum.Bs,
      creditDebit: CreditDebitEnum.Credit,
      dept: DeptEnum.ExtraOrdinaryGains,
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
        await updateAccount({
          variables: {
            id: values.id,
            name: values.name,
            description: values.description,
            bsPl: values.bsPl,
            creditDebit: values.creditDebit,
            dept: values.dept,
          },
        });
      } else {
        await createAccount({
          variables: {
            name: values.name,
            description: values.description,
            bsPl: values.bsPl,
            creditDebit: values.creditDebit,
            dept: values.dept,
          },
        });
      }

      form.reset();
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  async function remove() {
    if (!form.getValues("id")) return;

    try {
      await deleteAccount({
        variables: {
          id: form.getValues("id"),
        },
      });

      form.reset();
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return "Loading...";

  const accounts = !loading ? defaultData : data.accounts;

  const addedColumns: ColumnDef<AccountGraphqlType>[] = [
    ...columns,
    {
      id: "select",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            form.setValue("id", row.getValue("id"));
            form.setValue("name", row.getValue("name"));
            form.setValue("description", row.getValue("description"));
            form.setValue("bsPl", row.getValue("bsPl"));
            form.setValue("creditDebit", row.getValue("creditDebit"));
            form.setValue("dept", row.getValue("dept"));
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
                  name="dept"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dept</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(DeptEnum).map(([_, value]) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={conditionForm.control}
                  name="bsPl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BS/PL</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select BS/PL" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(BsPlEnum).map(([_, value]) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={conditionForm.control}
                  name="creditDebit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit/Debit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Credit/Debit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CreditDebitEnum).map(([_, value]) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Suspense fallback={<div>Loading table...</div>}>
              <DataTable columns={addedColumns} data={accounts!} />
            </Suspense>
          </CardFooter>
        </Card>
        <Card className="col-span-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(save)}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Account</CardTitle>
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
                  name="dept"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dept</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(DeptEnum).map(([_, value]) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bsPl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BS/PL</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select BS/PL" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(BsPlEnum).map(([_, value]) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="creditDebit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit/Debit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Credit/Debit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CreditDebitEnum).map(([_, value]) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
