import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const FilterGroup = ({
    title,
    items,
    selectedItems,
    onToggle,
    showAll,
    onToggleShowAll,
    maxVisible = 6,
  }: {
    title: string;
    items: { id: string; label: string; count: number }[];
    selectedItems: string[];
    onToggle: (id: string) => void;
    showAll?: boolean;
    onToggleShowAll?: () => void;
    maxVisible?: number;
  }) => {
    const visibleItems = showAll ? items : items.slice(0, maxVisible);
    const hasMore = items.length > maxVisible;

    return (
      <AccordionItem
        value={title.toLowerCase().replace(/\s+/g, "-")}
        className="border-b"
      >
        <AccordionTrigger className="py-4 text-xl font-medium hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2">
            <span>{title}</span>
            {selectedItems.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-sm px-2 py-1">
                {selectedItems.length}
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-4">
          <div className="space-y-3">
            {visibleItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    className="shadow-none size-5 cursor-pointer"
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => onToggle(item.id)}
                  />
                  <label
                    htmlFor={item.id}
                    className="text-base cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </label>
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  ({item.count.toLocaleString()})
                </span>
              </div>
            ))}
            {hasMore && onToggleShowAll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleShowAll}
                className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800 hover:bg-transparent"
              >
                {showAll ? "Show less" : `Show all ${items.length} options`}
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  export default FilterGroup;