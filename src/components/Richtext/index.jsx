"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./ToolBar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import ImageResize from "tiptap-extension-resize-image";

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading,
      Highlight,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
      Image,
      ImageResize,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your product description here...",
      }),
    ],
    content, // Initial content
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[200px] border border-gray-300 rounded-md bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      },
    },
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      if (updatedContent !== content) {
        onChange(updatedContent); // Trigger parent's onChange only when content changes
      }
    },
  });

  // Only set content when the editor is initialized and content changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
