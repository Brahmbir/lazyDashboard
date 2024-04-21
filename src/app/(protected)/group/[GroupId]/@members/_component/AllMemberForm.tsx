"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem, FormMessage } from "@/components/derivedUi/Fom";
import { AllAction } from "./AllAction";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
});

export default function AllMemberForm({ GroupId }: { GroupId: string }) {
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    AllAction(values, GroupId).then((data) => {
      if (data.success) {
        route.refresh();
      }
    });
    //     .then((data) => {
    //       if (data.success) {
    //         setSuccess(data.message);
    //         let path = DEFAULT_LOGIN_REDIRECT;
    //         router.push(path);
    //       } else {
    //         setError(data.error);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });
  };

  return (
    <div className="space-y-3">
      <h2 className="py-2">
        Enter the email of the member that you want to add at you workspace
      </h2>
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
                        placeholder="enter you email"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          </div>
          <Button type="submit" className="w-full">
            Login &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}
