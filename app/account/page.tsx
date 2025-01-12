"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { columns } from "@/app/account/columns";
import { DataTable } from "@/app/account/table";
import { Button } from "@/components/ui/button";
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
import {
  AccountGraphqlType,
  BsPlEnum,
  CreditDebitEnum,
  DeptEnum,
} from "@/src/graphql/graphql";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  dept: z.string(),
  bs_pl: z.string(),
  credit_debit: z.string(),
});

export default function Home() {
  const [accounts, setAccounts] = useState<AccountGraphqlType[]>([]);

  useEffect(() => {
    setAccounts([
      {
        id: "1",
        name: "name1",
        description: "desc1",
        bsPl: BsPlEnum.Bs,
        creditDebit: CreditDebitEnum.Credit,
        dept: DeptEnum.ExtraOrdinaryGains,
        createDate: new Date(),
        createObjectId: "system",
      },
    ]);
  }, []);

  function onsubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      dept: "",
      bs_pl: "",
      credit_debit: "",
    },
  });

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-2">
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
            name="bs_pl"
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
            name="credit_debit"
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
      <DataTable columns={columns} data={accounts!} />
    </div>
  );
}
