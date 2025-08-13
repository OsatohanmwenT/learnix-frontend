"use client";

import React, { useMemo } from "react";
import { generateHTML, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import TextAlign from "@tiptap/extension-text-align";

const RenderDescription = ({ json }: { json: JSONContent }) => {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [json]);
  return <div className="prose prose-li:marker:text-light-green">{parse(output)}</div>;
};

export default RenderDescription;
