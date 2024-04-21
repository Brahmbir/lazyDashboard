"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem, FormMessage } from "@/components/derivedUi/Fom";

import { RegisterSchema } from "@/schema/form/registerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/action/auth/registerAction";
import { FormError } from "../formError";
import { FormSuccess } from "../formSuccess";

import { useRouter, useSearchParams } from "next/navigation";
import OAuthComp from "./oAuthForm";
import { AutoToast } from "@/components/derivedUi/AutoToast";

export default function RegisterForm() {
  return (
    <>
      <div className="space-y-4">
        <OAuthComp description="Register using" />
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full" />
        <EmailRegister />
      </div>
    </>
  );
}

function EmailRegister() {
  const router = useRouter();

  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? `Email already in use with ${
          searchParams.get("provider") || "different"
        } provider!`
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          AutoToast(data.toast);

          if (data.success) {
            setSuccess(data.message);

            setTimeout(() => {
              router.push("/");
            }, 5000);
          } else {
            setError(data.error);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-neutral-500 font-bold text-sm text-left">
        Or register with your email
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-neutral-900 space-y-6"
        >
          <div className="space-y-3 flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      {...field}
                      className="col-span-2 "
                      disabled={isPending}
                      placeholder="my.mail@example.com"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
            />{" "}
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
          </div>
          <FormError message={error || urlError} key={1} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Register &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}
