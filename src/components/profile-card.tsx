"use client";

import { signOut } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";

import { useState } from "react";

import type { User } from "@prisma/client";
import { toast } from "sonner";

import { uploadImage } from "@/server/actions/upload";
import { updateUserImage } from "@/server/actions/user";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import UploadDropzone from "./upload-dropzone";

export default function ProfileCard({ user }: { user: User }) {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { execute } = useAction(updateUserImage);

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      toast.promise(uploadImage(formData), {
        loading: "در حال بروزرسانی تصویر...",
        success: (res) => {
          setFile(null);

          if (res?.imageUrl) {
            execute(res.imageUrl);

            return "تصویر با موفقیت بروزرسانی شد";
          }
        },
        error: "خطا در بروزرسانی تصویر",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-[6rem_3.5rem_3.5rem_auto] rounded-xl bg-primary-foreground">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3 rounded-t-xl bg-gradient-to-r from-[#fbe9d7] to-[#f6d5f7]" />
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 flex justify-between px-4 md:px-6">
        <div className="relative">
          <Image
            src={user.image || ""}
            alt={user.name || ""}
            width={120}
            height={120}
            className="z-10 aspect-square rounded-full ring-4 ring-primary-foreground ring-offset-0"
            priority
          />

          <Dialog
            open={open}
            onOpenChange={() => {
              setOpen((prevState) => !prevState);

              !open && setFile(null);
            }}
          >
            <DialogTrigger asChild>
              <Button
                size={"icon"}
                className="absolute -bottom-2 left-0 rounded-full ring ring-primary-foreground ring-offset-0"
              >
                <Icon name="Camera" size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[360px] rounded-lg md:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-right">
                  بارگذاری تصویر جدید
                </DialogTitle>
              </DialogHeader>

              <UploadDropzone
                onFileAccepted={(file) => {
                  setFile(file);
                }}
              />

              <DialogFooter className="gap-3 sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    onClick={handleUpload}
                    disabled={!file || status === "executing"}
                  >
                    بارگذاری تصویر
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                variant={"secondary"}
                className="self-end rounded-full bg-primary-foreground"
                onClick={() => signOut()}
              >
                <Icon name="LogOut" size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={"right"}>
              <p>خروج از حساب کاربری</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="row-start-4 row-end-5 px-4 pb-4 pt-10 md:px-6 md:pb-6">
        <h3 className="mb-1 scroll-m-20 text-2xl font-semibold tracking-tight">
          {user.name}
        </h3>
        <small className="font-inter text-sm font-medium leading-none text-muted-foreground">
          {user.username}@
        </small>
      </div>
    </div>
  );
}
