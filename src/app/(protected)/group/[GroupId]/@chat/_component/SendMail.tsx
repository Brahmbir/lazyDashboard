"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendMessage } from "./SendAction";
import { useSession } from "@/provider/SessionProvider";
import { AutoToast } from "@/components/derivedUi/AutoToast";
import router from "next/router";

const formSchema = z.object({
  message: z.string(),
});

const SendMail = ({ GroupId }: { GroupId: string }) => {
  const { user } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendMessage(values.message, GroupId, user?.email!).then((data) => {
      // AutoToast(data.toast);
      form.reset();
    });
  };

  return (
    <div className="space-y-2 h-fit border p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-neutral-900 flex gap-4"
        >
          <div className="space-y-3 flex-1">
            <>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-2"
                        disabled={false}
                        placeholder="Send message"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          </div>
          <Button type="submit">&rarr;</Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMail;
