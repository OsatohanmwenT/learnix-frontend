"use client"

import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-between p-10">
        <div className="flex items-center w-full justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2 font-poppins">
            <p>Don't have an account?</p>
            <Link href="/sign-up">
              <Button variant="outline" className="shadow-none">
                Register
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto px-5">
          <h1 className="font-hanken font-bold text-3xl mb-2 text-center">
            Login to your account
          </h1>
          <p className="text-center font-hanken font-medium text-neutral-500 mb-6">
            Enter your login details
          </p>
          <AuthForm
            mode="login"
            onSubmit={signIn}
          />
        </div>
        <div></div>
      </div>
      <div className="relative max-lg:hidden h-screen w-full">
        <div className="absolute inset-0 bg-black/40"></div>
        <Image
          src="/auth-pic2.jpg"
          alt="Auth Background"
          height={1000}
          width={1000}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default page;
