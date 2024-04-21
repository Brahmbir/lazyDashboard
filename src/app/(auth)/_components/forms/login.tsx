"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem, FormMessage } from "@/components/derivedUi/Fom";

import { useTransition, useState } from "react";

import { LoginSchema } from "@/schema/form/loginSchema";
import { FormError } from "@/app/(auth)/_components/formError";
import { FormSuccess } from "@/app/(auth)/_components/formSuccess";

import { logIn } from "@/action/auth/logAction";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { resendVerificationEmail } from "@/action/auth/verifyEmailAction";
import OAuthComp from "./oAuthForm";
import { AutoToast } from "@/components/derivedUi/AutoToast";

export default function LoginForm() {
  return (
    <>
      <div className="space-y-4">
        <OAuthComp description="Login using" />
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full" />
        <EmailLogin />
      </div>
    </>
  );
}

function EmailLogin() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? `Email already in use with ${
          searchParams.get("provider") || "different"
        } provider!`
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Resend = (data: Record<string, any>) => {
    resendVerificationEmail(data.email)
      .then((data) => {
        AutoToast(data.toast);
        if (data.success) {
          setSuccess(data.message);
        } else {
          setError(data.error);
        }
      })
      .catch(() => setError("Something went wrong"));
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      logIn(values)
        .then((data) => {
          AutoToast(data.toast, {
            label: "Send",
            onClick: (actionData) => Resend(actionData as object),
          });

          if (data.success) {
            setSuccess(data.message);

            let path = callbackUrl || DEFAULT_LOGIN_REDIRECT;
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
      <p className="text-neutral-500 font-bold text-sm text-left">
        Or Login with your email
      </p>
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
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="w-fit h-fit ml-auto px-0 pt-1 col-span-2"
                    >
                      <Link href="/login/password">Forgot password?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={error || urlError} key={1} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}
