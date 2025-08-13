"use client";

import { useId } from "react";

import { Input } from "@/components/ui/input";
import { FieldValues } from "react-hook-form";

interface PriceInputProps extends FieldValues {
  field: FieldValues;
}

export default function PriceInput({ field }: PriceInputProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-6 pe-12"
          placeholder="0.00"
          type="text"
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9.]/g, "");
            console.log(onlyNums);
            field.onChange(parseFloat(onlyNums));
          }}
          {...field}
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          ₦
        </span>
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
          NGN
        </span>
      </div>
    </div>
  );
}
