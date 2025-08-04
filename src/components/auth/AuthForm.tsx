"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginSchema,
  loginSchema,
  signUpSchema,
  SignUpSchema,
} from "@/lib/schema/auth";
import { Input } from "../ui/input";
import PasswordInput from "./PasswordInput";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AuthFormProps<T> {
  mode: AuthMode;
  onSubmit: (
    data: any
  ) => Promise<{ success: boolean; message: string; user: any }>;
  isLoading?: boolean;
  submitButtonText?: string;
}

const AuthForm = <T,> ({ mode, onSubmit, submitButtonText }: AuthFormProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const isSignup = mode === "signup";
  const schema = isSignup ? signUpSchema : loginSchema;
  const defaultValues = isSignup
    ? { email: "", password: "", firstName: "", lastName: "", role: "learner" }
    : { email: "", password: "" };

  const form = useForm<LoginSchema | SignUpSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const buttonText =
    submitButtonText || (isSignup ? "Create Account" : "Sign In");

  const handleSubmit = async (data: LoginSchema | SignUpSchema) => {
    setIsLoading(true);
    try {
      const res = await onSubmit(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-3">
        {isSignup && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    First Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      className="w-full h-auto py-3 shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Last Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      className="w-full h-auto py-3 shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="cols-span-2">
              <FormLabel className="text-base">
                Email address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  className="w-full h-auto py-3 shadow-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignup && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-base">
                  Role <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="cols-span-1">
              <FormLabel className="text-base">
                Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full h-auto py-2 text-base mt-6"
        >
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
