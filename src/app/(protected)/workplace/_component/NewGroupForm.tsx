"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem, FormMessage } from "@/components/derivedUi/Fom";

import { NewGroupSchema } from "../schema/NewGroup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AutoToast } from "@/components/derivedUi/AutoToast";
import { FormError } from "@/app/(auth)/_components/formError";
import { FormSuccess } from "@/app/(auth)/_components/formSuccess";
import { CreateNewGroup } from "../action/newGroup";
import { useSession } from "@/provider/SessionProvider";
import { useRouter } from "next/navigation";

export function NewGroupForm() {
  const { user } = useSession();

  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewGroupSchema>>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      name: "",
      uniqueGroupName: "",
      //   PictureUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewGroupSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      CreateNewGroup(values, user)
        .then((data) => {
          AutoToast(data.toast);
          if (data.success) {
            setSuccess(data.message);
            router.refresh();
          } else {
            setError(data.error);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-neutral-900 space-y-6"
        >
          <div className="space-y-3 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      {...field}
                      className="col-span-2 "
                      disabled={isPending}
                      placeholder="AB group"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uniqueGroupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique Code</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      {...field}
                      className="col-span-2"
                      disabled={isPending}
                      placeholder="@12345"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} key={1} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create Group
          </Button>
        </form>
      </Form>
    </div>
  );
}
