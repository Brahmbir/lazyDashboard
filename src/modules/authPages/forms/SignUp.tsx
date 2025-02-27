"use client";
import * as z from "zod";
import { useTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../schema";

import { EmailSignup } from "../actions/signUpAction";

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

export default function EmailSignUpForm() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? `Email already in use with ${
          searchParams.get("provider") || "different"
        } provider!`
      : "";

  const [errorM, setErrorM] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setErrorM("");
    setSuccess("");

    startTransition(async () => {
      const result = await EmailSignup(values);

      //   AutoToast(result.toast);

      if (result.success) {
        startTransition(() => {
          setSuccess("Account created 👋");
          //   toast.message("Email sent", {
          //     description: "Email is sent to your email address for verification",
          //   });
        });
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      } else {
        startTransition(() => {
          setErrorM(result.error);
        });
      }
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
                      placeholder="********"
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
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorM || urlError} key={1} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Register &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}
