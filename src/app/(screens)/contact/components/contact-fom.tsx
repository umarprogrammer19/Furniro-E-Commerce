"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  subject: z.string().min(0, {
    message: "",
  }),
  message: z.string().min(10, {
    message: "Message must be atleast 10 characters long.",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
    toast.success("Message sent successfully!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full md:w-[435px]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. John Doe"
                  {...field}
                  className="border-[1px] border-solid border-[#9F9F9F]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  className="border-[1px] border-solid border-[#9F9F9F]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="This is optional"
                  {...field}
                  className="border-[1px] border-solid border-[#9F9F9F]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter message here"
                  {...field}
                  className="border-[1px] border-solid border-[#9F9F9F]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-white bg-myOrange w-full sm:w-[237px] h-[55px] hover:bg-myOrange hover:opacity-85"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
