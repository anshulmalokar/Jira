"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateWorkSpaceSchema } from "../schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-seperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkSpace } from "../api/use-update-workspace";

type Props = {
  onCancel?: () => void;
  initialValues: Workspace;
};

export default function EditWorkSpace({ onCancel, initialValues }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUpdateWorkSpace();
  const form = useForm<z.infer<typeof updateWorkSpaceSchema>>({
    resolver: zodResolver(updateWorkSpaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = (values: z.infer<typeof updateWorkSpaceSchema>) => {
    const finalValue = {
      name: values.name,
      image: values.image instanceof File ? values.image : "",
    };
    mutate({
      form: finalValue,
      param: { workspaceId: initialValues.$id },
    });
  };

  return (
    <>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-4">
          <Button
            size={"sm"}
            onClick={
              onCancel
                ? onCancel
                : () => {
                    router.push(`/workspaces/${initialValues.$id}`);
                  }
            }
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Workspace Name" />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] rounded-md relative overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="logo"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <>
                            <Avatar className="size-[72px]">
                              <AvatarFallback>
                                <ImageIcon className="size-[36px] text-neutral-400" />
                              </AvatarFallback>
                            </Avatar>
                          </>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">WorkSpace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEF, max 1mb
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              disabled={isPending}
                              type="button"
                              variant={"secondary"}
                              size="sm"
                              className="w-full mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              disabled={isPending}
                              type="button"
                              variant={"secondary"}
                              size="sm"
                              className="w-full mt-2"
                              onClick={() => {
                                inputRef.current?.click();
                              }}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                ></FormField>
                <div className="px-4">
                  <DottedSeparator />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    className={cn(!onCancel && "invisible")}
                    disabled={isPending}
                    type="button"
                    size={"lg"}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} size={"lg"}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
