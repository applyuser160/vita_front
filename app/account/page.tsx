"use client";

import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
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
import { ACCOUNTS } from "@/lib/graphql";
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
  });

  const defaultData: AccountGraphqlType[] = [
    {
      id: "1",
      name: "name1",
      description: "desc1",
      bsPl: BsPlEnum.Bs,
      creditDebit: CreditDebitEnum.Credit,
      dept: DeptEnum.ExtraOrdinaryGains,
      createDate: new Date(),
      createObjectId: "system",
      updateDate: new Date(),
      updateObjectId: "system",
      deleteDate: new Date(),
      deleteObjectId: "system",
    },
  ];

  function onSubmit(values: z.infer<typeof conditionFormSchema>) {
    refetch(values);
  }

  if (loading) return "Loading...";

  // if (error) return `Error! ${error.message}`;

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
    <div className="grid grid-flow-row-dense grid-cols-12">
      <Card className="h-auto col-span-8">
        <CardHeader>
          <CardTitle>Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...conditionForm}>
            <form onSubmit={conditionForm.handleSubmit(onSubmit)}>
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            {...field}
                          />
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            {...field}
                          />
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            {...field}
                          />
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
          <DataTable columns={addedColumns} data={accounts!} />
        </CardFooter>
      </Card>
      <Card className="col-span-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Account</CardTitle>
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            {...field}
                          />
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            {...field}
                          />
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            {...field}
                          />
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
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
