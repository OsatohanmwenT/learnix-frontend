import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/actions/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen grid lg:grid-cols-2">
      <div className="bg-black max-lg:hidden h-screen w-full">
        <Image
          src="/auth-pic1.jpg"
          alt="Auth Background"
          height={1000}
          width={1000}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col items-center h-screen justify-between p-10">
        <div className="flex items-center w-full justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2 font-poppins">
            <p>have an account?</p>
            <Link href="/sign-in">
              <Button variant="outline" className="shadow-none">
                Login
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto px-5">
          <h1 className="font-hanken font-bold text-xl mb-2 text-center">
            Sign Up
          </h1>
          <p className="text-center text-sm font-hanken font-medium text-neutral-500 mb-6">
            Enter your details to register
          </p>
          <AuthForm mode="signup" onSubmit={signUp} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
