import { EditorContent, useEditor } from "@tiptap/react";

import { editorExtensions } from "@/lib/constants";

import TiptapToolbar from "./tiptap-toolbar";

type Props = {
  onChange: (richText: string) => void;
};

export default function TiptapEditor({ onChange }: Props) {
  const editor = useEditor({
    extensions: editorExtensions,
    autofocus: "end",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm min-h-[500px] w-full max-w-full rounded-md border border-input bg-background px-3 py-2 text-primary ring-offset-background dark:prose-invert sm:prose-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-3 ">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
