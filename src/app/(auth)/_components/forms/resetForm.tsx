"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem, FormMessage } from "@/components/derivedUi/Fom";

import { useTransition, useState } from "react";

import { FormError } from "@/app/(auth)/_components/formError";
import { FormSuccess } from "@/app/(auth)/_components/formSuccess";

import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { PasswordResetSchema } from "@/schema/form/PasswordSchema";
import { SetNewPassword } from "@/action/auth/resetAction";

export default function ResetForm() {
  return (
    <>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full" />
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
    startTransition(() => {
      SetNewPassword(values, token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.message);
            let path = DEFAULT_LOGIN_REDIRECT;
            router.push(path);
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
