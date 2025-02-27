"use client";
import * as z from "zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "../schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "../components/FormMessage";

import { DEFAULT_LOGIN_REDIRECT } from "@/utils/AuthRoutes";
import { authClient } from "@/lib/auth/client";
import { processedEmails } from "../utils";

export default function ResetForm() {
  return (
    <>
      <div className="space-y-4">
        <div className="bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full" />
        <NewPasswordForm />
      </div>
    </>
  );
}

function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const token = useSearchParams().get("token");

  if (!token) {
    return redirect("/");
  }

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const Result = PasswordResetSchema.safeParse(values);
      if (!Result.success) {
        // return {
        //   success: false,
        //   error: Result.error.message,
        //   toast: { method: "Error", message: "Schema do not match at sever" },
        // };
      } else {
        const Data = Result.data;

        if (Data.password !== Data.confirmPassword) {
          //   return {
          //     success: false,
          //     toast: {
          //       method: "Warning",
          //       message: "Confirm Password should match",
          //     },
          //     error: "Password do not match at server side",
          //   };
        } else {
          const { data, error } = await authClient.resetPassword({
            newPassword: Data.password,
            token,
          });
        }
      }
    });
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-neutral-900 space-y-8"
        >
          <div className="space-y-3 flex flex-col">
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-2"
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-2"
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={error} key={1} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}
