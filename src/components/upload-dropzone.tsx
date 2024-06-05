import Image from "next/image";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

import Icon from "./common/icon";
import { Button } from "./ui/button";

type Props = {
  onFileAccepted: (file: File | undefined) => void;
  defaultImageUrl?: string;
};

export default function UploadDropzone({
  onFileAccepted,
  defaultImageUrl,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    defaultImageUrl,
  );
  const [errors, setErrors] = useState<{ code: string; message: string }[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setPreviewUrl(URL.createObjectURL(file));

      onFileAccepted(file);
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDropRejected(fileRejections) {
      setErrors(fileRejections[0].errors);
    },
  });

  return (
    <>
      {previewUrl ? (
        <div className="relative w-full max-w-full overflow-hidden rounded-md">
          <Image
            src={previewUrl}
            width={398}
            height={398}
            alt={""}
            style={{ width: "auto", height: "auto" }}
            className="h-72 w-full rounded-md object-cover"
          />

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute right-2 top-2 size-9 rounded-full"
            onClick={() => {
              setPreviewUrl(undefined);
              onFileAccepted(undefined);
            }}
          >
            <Icon name="Trash" size={20} />
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            {...getRootProps({
              className: cn(
                "border-2 border-dashed p-8 flex justify-center items-center flex-col rounded-md gap-8",
                {
                  "border-destructive": errors.length > 0,
                  "bg-secondary": isDragActive,
                },
              ),
            })}
          >
            <div className="flex flex-col items-center gap-3">
              <Icon name="ImageUp" size={50} />
              <p className="text-[13px] text-muted-foreground md:text-sm">
                فرمت های png, jpg ,jpeg - حدااکثر حجم 1MB
              </p>
            </div>

            <input {...getInputProps({ accept: "image/*" })} />

            <div className="flex flex-col items-center gap-3">
              {isDragActive ? (
                <p className="leading-7">تصویر را اینجا رها کنید</p>
              ) : (
                <p className="leading-7">
                  تصویر را بکشید و در اینجا رها کنید, یا
                </p>
              )}
              <Button
                type="button"
                variant={"secondary"}
                size={"sm"}
                onClick={open}
              >
                انتخاب تصویر
              </Button>
            </div>
          </div>

          {/* File upload errors */}
          {errors.length > 0 &&
            errors.map((err, index) => {
              const { code } = err;

              return (
                <React.Fragment key={index}>
                  {code === "file-too-large" ? (
                    <p className="text-destructive">
                      حجم فایل باید حداکثر 1MB باشد
                    </p>
                  ) : code === "file-invalid-type" ? (
                    <p className="text-destructive">
                      تنها فایل هایی با فرمت jpeg, jpg و png مجاز می باشد
                    </p>
                  ) : code === "too-many-files" ? (
                    <p className="text-destructive">
                      تنها می توانید یک تصویر آپلود کنید
                    </p>
                  ) : null}
                </React.Fragment>
              );
            })}
        </div>
      )}
    </>
  );
}
