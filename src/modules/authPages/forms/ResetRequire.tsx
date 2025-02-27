"use client";
import * as z from "zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetRequireSchema } from "../schema";

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

export default function ForgotenPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof PasswordResetRequireSchema>>({
    resolver: zodResolver(PasswordResetRequireSchema),
    defaultValues: {
      email: "",
    },
  });

  const Resend = (data: Record<string, any>) => {
    // resendVerificationEmail(data.email)
    //   .then((data) => {
    //     AutoToast(data.toast);
    //     if (data.success) {
    //       setSuccess(data.message);
    //     } else {
    //       setError(data.error);
    //     }
    //   })
    //   .catch(() => setError("Something went wrong"));
  };

  const onSubmit = (values: z.infer<typeof PasswordResetRequireSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });
      if (result.data) {
        // AutoToast({
        //   method: "Info",
        //   message: "A mail with link to change your password has been send",
        // });
      }
      console.log(result);

      // SendResetEmail(values)
      //   .then((data) => {
      //     AutoToast(data.toast, {
      //       label: "Send",
      //       onClick: (actionData) => Resend(actionData as object),
      //     });
      //     if (data.success) {
      //       setSuccess(data.message);
      //       router.push(DEFAULT_LOGIN_REDIRECT);
      //     } else {
      //       setError(data.error);
      //     }
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-2"
                        disabled={isPending}
                        placeholder="my.mail@example.com"
                        type="email"
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
            Send mail &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}
