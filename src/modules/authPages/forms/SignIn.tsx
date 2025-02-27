"use client";
import * as z from "zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../schema";

// import { EmailSignup } from "../actions/signUpAction";

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

export default function EmailSignInForm() {
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

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Resend = (email: string) => {
    authClient
      .sendVerificationEmail({
        email: email,
      })
      .catch(() => setError("Something went wrong"));
  };

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await authClient.signIn.email({
        rememberMe: true,
        email: processedEmails(values.email),
        password: values.password,
      });
      if (result.data) {
        startTransition(() => {
          setSuccess("Logged in successfully");
        });
        // AutoToast({
        //   method: "Success",
        //   message: "Welcome " + result.data.user.name,
        // });

        let path = callbackUrl || DEFAULT_LOGIN_REDIRECT;
        router.push(path);
      } else {
        console.log(result.error);

        switch (result.error.code) {
          case "INVALID_EMAIL_OR_PASSWORD":
            startTransition(() => {
              setError("Invalid email or password");
            });
          case "EMAIL_NOT_VERIFIED":
            startTransition(() => {
              setError("Email is not verified");
              //   AutoToast({
              //     method: "Action",
              //     message: {
              //       title: "Email is not verified",
              //       description:
              //         "To verify your Account, do you want us to send you a verification mail?",
              //     },
              //     action: {
              //       label: "Send",
              //       onClick: () => Resend(values.email),
              //     },
              //   });
            });
          default:
            startTransition(() => {
              setError(result.error.message!);
            });
        }
      }
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
                      <Link href="/forget-password">Forgot password?</Link>
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
