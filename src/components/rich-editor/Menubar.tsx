"use client";

import React, { useEffect, useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  List,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MenuBarProps {
  editor: Editor | null;
}

const Menubar: React.FC<MenuBarProps> = ({ editor }) => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      console.log("Editor updated, forcing re-render");
      forceUpdate({}); // Force component to re-render
    };

    // Listen to editor state changes
    editor.on("selectionUpdate", handleUpdate);
    editor.on("transaction", handleUpdate);

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("transaction", handleUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex border border-input items-center rounded-t-sm p-1 flex-wrap">
      <TooltipProvider>
        <div className="flex items-center space-x-1 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle bold"
                className={cn(
                  "rounded-xs",
                  editor.isActive("bold")
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle italic"
                className={cn(
                  "rounded-xs",
                  editor.isActive("italic") && "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle strike"
                className={cn(
                  "rounded-xs",
                  editor.isActive("strike") && "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Strike</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle heading 1"
                className={cn(
                  "rounded-xs",
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle heading 2"
                className={cn(
                  "rounded-xs",
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Heading 2</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle heading 3"
                className={cn(
                  "rounded-xs",
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Heading 3</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle bullet list"
                className={cn(
                  "rounded-xs",
                  editor.isActive("bulletList") &&
                    "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
              >
                <List />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Bullet list</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle ordered list"
                className={cn(
                  "rounded-xs",
                  editor.isActive("orderedList") &&
                    "bg-muted text-muted-foreground"
                )}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
              >
                <ListOrderedIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Ordered list</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px bg-border mx-2 h-6" />

        <div className="flex items-center space-x-1 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle Align Left"
                className={cn(
                  "rounded-xs",
                  editor.isActive({ textAlign: "left" })
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <AlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle Align Center"
                className={cn(
                  "rounded-xs",
                  editor.isActive({ textAlign: "center" })
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <AlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Align Center</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                aria-label="Toggle Align Right"
                className={cn(
                  "rounded-xs",
                  editor.isActive({ textAlign: "right" })
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <AlignRight />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px bg-border mx-2 h-6" />

        <div className="flex items-center space-x-1 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() =>
                  editor.chain().focus().undo().run()
                }
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() =>
                  editor.chain().focus().redo().run()
                }
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="font-hanken">
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
