"use client";

import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { columns } from "@/app/balance/columns";
import { DataTable } from "@/app/balance/table";
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
import { JOURNAL_ENTRIES } from "@/lib/graphql";
import { JournalEntryGraphqlType, StatusEnum } from "@/src/graphql/graphql";

const conditionFormSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  status: z.string().optional(),
  accountId: z.string().optional(),
  subAccountId: z.string().optional(),
});

export default function Home() {
  const conditionForm = useForm<z.infer<typeof conditionFormSchema>>({
    resolver: zodResolver(conditionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      fromDate: "",
      toDate: "",
      status: undefined,
      accountId: "",
      subAccountId: "",
    },
  });

  const { loading, data, refetch } = useQuery(JOURNAL_ENTRIES, {
    variables: conditionForm.getValues,
  });

  const defaultData: JournalEntryGraphqlType[] = [
    {
      id: "1",
      name: "name1",
      description: "desc1",
      targetDate: "2024-01-01",
      status: StatusEnum.Fixed,
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

  if (loading) return "Loading...";

  const journalEntries = !loading ? defaultData : data.journalEntries;

  const addedColumns: ColumnDef<JournalEntryGraphqlType>[] = [...columns];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-flow-row-dense grid-cols-12 gap-4">
        <Card className="col-span-12">
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
                  name="fromDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FromDate</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={conditionForm.control}
                  name="toDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ToDate</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={conditionForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(StatusEnum).map(([_, value]) => (
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
                <FormField
                  control={conditionForm.control}
                  name="subAccountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SubAccountId</FormLabel>
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
            <DataTable columns={addedColumns} data={journalEntries!} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
