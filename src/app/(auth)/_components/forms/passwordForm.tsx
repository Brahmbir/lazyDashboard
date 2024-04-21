"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem, FormMessage } from "@/components/derivedUi/Fom";
import { toast } from "sonner";

import { FormError } from "@/app/(auth)/_components/formError";
import { FormSuccess } from "@/app/(auth)/_components/formSuccess";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { PasswordEmailSchema } from "@/schema/form/PasswordSchema";
import { SendResetEmail } from "@/action/auth/passwordAction";
import { AutoToast } from "@/components/derivedUi/AutoToast";
import { resendVerificationEmail } from "@/action/auth/verifyEmailAction";

export default function PasswordForm() {
  return (
    <>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full" />
        <EmailForm />
      </div>
    </>
  );
}

function EmailForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof PasswordEmailSchema>>({
    resolver: zodResolver(PasswordEmailSchema),
    defaultValues: {
      email: "",
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

  const onSubmit = (values: z.infer<typeof PasswordEmailSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      SendResetEmail(values)
        .then((data) => {
          AutoToast(data.toast, {
            label: "Send",
            onClick: (actionData) => Resend(actionData as object),
          });

          if (data.success) {
            setSuccess(data.message);
            router.push(DEFAULT_LOGIN_REDIRECT);
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
