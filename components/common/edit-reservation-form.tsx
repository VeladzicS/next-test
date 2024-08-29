"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useImperativeHandle, useRef } from "react";
import Image from "next/image";

interface FormActions {
  submitForm: () => void;
}
const FormSchema = z.object({
  email: z
    .string()
    .min(3, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  res_number: z.string().min(3, { message: "This field has to be filled." }),
});

export function EditReservationForm() {
  const formRef = useRef<FormActions>(null);
  useImperativeHandle(formRef, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      res_number: "",
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-semibold hover:bg-transparent hover:text-primary"
        >
          <Image
            src="/icons/ico_edit.svg"
            alt="edit"
            width={15}
            height={15}
            className="mr-3 filter-primary"
          />
          Edit reservation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit existing reservation</DialogTitle>
          <DialogDescription>
            If you already have a reservation, you can edit it here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      className="h-[50px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="res_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Reservation number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Reservation number"
                      className="h-[50px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              formRef.current?.submitForm();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
