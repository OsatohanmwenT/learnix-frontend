"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Menubar from "./Menubar";
import { FieldValues } from "react-hook-form";

interface EditorProps extends FieldValues {
  field: FieldValues;
  style?: string;
}

const Editor = ({ field, style }: EditorProps) => {
  const parseContent = (value: string) => {
    if (!value || value.trim() === "") {
      return "<p>Start typing your content here...</p>";
    }

    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch (error) {
      console.warn(
        "Failed to parse editor content as JSON, treating as plain text:",
        error
      );
      const escaped = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<p>${escaped}</p>`;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: `m-0 !w-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl !max-w-none xl:!leading-0 min-h-[300px] ${style} focus:outline-none p-4 pt-5 border-t-0 border border-input overflow-hidden bg-input/20`,
      },
    },
    onUpdate: ({ editor }) => {
      try {
        const content = editor.getJSON();
        console.log("Editor content updated:", content);
        field.onChange(JSON.stringify(content));
      } catch (error) {
        console.error("Failed to serialize editor content:", error);
        field.onChange(editor.getHTML());
      }
    },
    content: parseContent(field.value),
    immediatelyRender: false,
  });

  return (
    <div className="w-full">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
