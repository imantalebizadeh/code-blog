"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import { editorExtensions } from "@/lib/constants";

export default function ArticleContent({ content }: { content: string }) {
  const editor = useEditor({
    extensions: editorExtensions,
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
