"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
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
import { BASE_URL } from "@/lib/api/baseUrl";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  subject: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const toastId = toast.loading("Submitting your message...");

    try {
      const response = await fetch(`${BASE_URL}/api/v5/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Your application submitted successfully!", { id: toastId });
        form.reset();
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit the form.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
                    placeholder="ex. Umar Farooq"
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
                    placeholder="umarofficial0121@gmail.com"
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
            disabled={loading}
            className="text-white bg-myOrange w-full sm:w-[237px] h-[55px] hover:bg-myOrange hover:opacity-85"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
}
