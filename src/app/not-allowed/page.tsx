import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="p-2 flex font-hanken items-center justify-center gap-4 h-screen">
      <Card className="w-full shadow rounded-xs max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto flex items-center justify-center">
            <ShieldX className="text-destructive size-12" />
          </div>
          <CardTitle className="text-2xl">
            Access Restricted
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground max-w-xs mx-auto">
            You do not have the necessary permissions to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className={buttonVariants({
            className: "w-full !bg-light-green",
          })}>
          <ArrowLeft className="size-4 mr-2 inline" />
          Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
