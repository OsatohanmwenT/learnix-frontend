import React from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface CustomBadgeProps {
  item: Omit<Tag, "count"> | undefined;
  onRemove: () => void;
}

const CustomBadge = ({ item, onRemove }: CustomBadgeProps) => {
  return (
    <button className="cursor-pointer hover:scale-105 transition-all" key={item?.id} onClick={onRemove}>
      <Badge
        variant="default"
        className="flex text-sm bg-light-green font-hanken py-2 px-3 rounded-full items-center gap-1"
      >
        {item?.label}
        <X className="!size-5 cursor-pointer" />
      </Badge>
    </button>
  );
};

export default CustomBadge;
