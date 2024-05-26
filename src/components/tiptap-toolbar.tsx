import { ElementRef, useCallback, useRef, useState } from "react";

import { PopoverClose } from "@radix-ui/react-popover";
import type { Editor } from "@tiptap/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Icon from "./common/icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";

type Props = {
  editor: Editor | null;
};

type TextAlign = {
  right: boolean;
  left: boolean;
  center: boolean;
};

export default function TiptapToolbar({ editor }: Props) {
  const inputRef = useRef<ElementRef<"input">>(null);

  const [textAlign, setTextAlign] = useState<TextAlign>({
    right: true,
    left: false,
    center: false,
  });

  const setLink = useCallback(() => {
    if (editor) {
      const url = inputRef.current?.value || "";

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex items-center gap-5 rounded-md border border-input bg-transparent p-3 max-md:overflow-x-scroll">
      <div className="flex gap-2">
        {/* Bold */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("bold")}
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          title="Ctrl + B | ضخیم"
        >
          <Icon name="Bold" size={16} />
        </Toggle>

        {/* Italic */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("italic")}
          onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          title="Ctrl + I | مورب"
        >
          <Icon name="Italic" size={16} />
        </Toggle>

        {/* Underline */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("underline")}
          onPressedChange={() =>
            editor?.chain().focus().toggleUnderline().run()
          }
          title="Ctrl + U | زیرخط"
        >
          <Icon name="Underline" size={16} />
        </Toggle>

        {/* Strike */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("strike")}
          onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
          title="Ctrl + Shift + S | خط روی متن"
        >
          <Icon name="Strikethrough" size={16} />
        </Toggle>

        {/* Highlighter */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("highlight")}
          onPressedChange={() =>
            editor?.chain().focus().toggleHighlight().run()
          }
          title="Ctrl + Shift + H | نشانه گذاری"
        >
          <Icon name="Highlighter" size={16} />
        </Toggle>

        {/* Code */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("codeBlock")}
          onPressedChange={() =>
            editor?.chain().focus().toggleCodeBlock().run()
          }
          title="Ctrl + Alt + C | بلوک کد"
        >
          <Icon name="CodeXml" size={16} />
        </Toggle>
      </div>

      <div className="flex gap-2">
        {/* Heading1 */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("heading1")}
          onPressedChange={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          title="Ctrl + Alt + 1 | سربرگ 1"
        >
          <Icon name="Heading1" size={16} />
        </Toggle>

        {/* Heading2 */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("heading2")}
          onPressedChange={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Ctrl + Alt + 2 | سربرگ 2"
        >
          <Icon name="Heading2" size={16} />
        </Toggle>

        {/* Heading3 */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("heading3")}
          onPressedChange={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="Ctrl + Alt + 3 | سربرگ 3"
        >
          <Icon name="Heading3" size={16} />
        </Toggle>
      </div>

      <div className="flex gap-2">
        {/* Blockquote */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("blockquote")}
          onPressedChange={() =>
            editor?.chain().focus().toggleBlockquote().run()
          }
          title="بلوک نقل قول"
        >
          <Icon name="Quote" size={16} />
        </Toggle>

        {/* Bullet List */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("bulletList")}
          onPressedChange={() =>
            editor?.chain().focus().toggleBulletList().run()
          }
          title="لیست نا مرتب"
        >
          <Icon name="List" size={16} />
        </Toggle>

        {/* Ordered List */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={editor?.isActive("orderedList")}
          onPressedChange={() =>
            editor?.chain().focus().toggleOrderedList().run()
          }
          title="لیست مرتب شده"
        >
          <Icon name="ListOrdered" size={16} />
        </Toggle>
      </div>

      <div className="flex gap-2">
        {/* Text Align - right */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={textAlign.right}
          onPressedChange={() => {
            editor.commands.setTextAlign("right");
            setTextAlign({ right: true, center: false, left: false });
          }}
          title="تراز متن از سمت راست"
        >
          <Icon name="AlignRight" size={16} />
        </Toggle>

        {/* Text Align - center */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={textAlign.center}
          onPressedChange={() => {
            editor.commands.setTextAlign("center");
            setTextAlign({ right: false, center: true, left: false });
          }}
          title="تراز متن به وسط"
        >
          <Icon name="AlignCenter" size={16} />
        </Toggle>

        {/* Text Align - left */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={textAlign.left}
          onPressedChange={() => {
            editor.commands.setTextAlign("left");
            setTextAlign({ right: false, center: false, left: true });
          }}
          title="تراز متن از سمت چپ"
        >
          <Icon name="AlignLeft" size={16} />
        </Toggle>
      </div>

      <div className="flex gap-2">
        {/* Link */}
        <Popover>
          <PopoverTrigger>
            <Toggle size="sm" variant={"outline"} pressed={false} title="پیوند">
              <Icon name="Link2" size={16} />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex items-center gap-3">
              <Input
                defaultValue={editor.getAttributes("link").href}
                ref={inputRef}
              />

              <PopoverClose asChild>
                <Button onClick={setLink}>ذخیره</Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>

        {/* Unlink */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={false}
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
          title="حذف پیوند"
        >
          <Icon name="Link2Off" size={16} />
        </Toggle>
      </div>

      <div className="flex gap-2">
        {/* Undo */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={false}
          onPressedChange={() => editor.commands.undo()}
          title="Ctrl + Z | بازگردانی"
        >
          <Icon name="Redo" size={16} />
        </Toggle>

        {/* Redo */}
        <Toggle
          size="sm"
          variant={"outline"}
          pressed={false}
          onPressedChange={() => editor.commands.redo()}
          title="Ctrl + R | باز انجام"
        >
          <Icon name="Undo" size={16} />
        </Toggle>
      </div>
    </div>
  );
}
