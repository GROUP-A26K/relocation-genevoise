"use client";

import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, UseFormRegister } from "react-hook-form";
import PDFIcon from "@/assets/img/icons/file/pdf-type-icon.svg";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { CircularProgressBar } from "@/components/customs/Progress/circularProgressBar";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";
const COMPLETED_PROGRESS = 100;

interface UploadState {
  file: File;
  progress: number;
  timerId: NodeJS.Timeout;
}

interface UploadFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  onChange: (file: File | null) => void;
  isRequired?: boolean;
  error?: string;
}

const formatSize = (bytes: number) => `${Math.round(bytes / 1000)} KB`;

export const UploadField: React.FC<UploadFieldProps> = ({
  label,
  isRequired,
  error,
  onChange,
  className,
  ...props
}) => {
  const [upload, setUpload] = useState<UploadState | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const simulateUpload = (file: File) => {
    const timer = setInterval(() => {
      setUpload((curr) => {
        if (!curr) return curr;
        const next = Math.min(
          curr.progress + Math.floor(Math.random() * 15) + 5,
          COMPLETED_PROGRESS
        );
        if (next === COMPLETED_PROGRESS) {
          clearInterval(curr.timerId);
          setUploadedFile(file);
          return null;
        }
        return { ...curr, progress: next };
      });
    }, 180);

    setUpload({ file, progress: 0, timerId: timer });
  };

  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) onChange(files[0]);
      simulateUpload(files[0]);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const clearFile = () => {
    if (upload) clearInterval(upload.timerId);
    setUpload(null);
    onChange(null);
    setUploadedFile(null);
  };

  return (
    <FormField
      isRequired={isRequired}
      label={label}
      message={error}
      className={className}
    >
      <Controller
        name={props.name}
        render={({}) => (
          <div className="w-full">
            <label
              {...getRootProps()}
              className="flex flex-col items-center justify-center w-full border border-gray-200 rounded-[12px] hover:border-black-50 cursor-pointer"
            >
              {upload && (
                <FileCard
                  file={upload.file}
                  progress={upload.progress}
                  onRemove={clearFile}
                />
              )}

              {uploadedFile && !upload && (
                <FileCard file={uploadedFile} onRemove={clearFile} />
              )}

              {!upload && !uploadedFile && <EmptyState />}
            </label>

            <Input
              {...getInputProps()}
              type="file"
              className="hidden"
              {...props}
              id="upload-input"
            />
          </div>
        )}
      />
    </FormField>
  );
};

function FileCard({
  file,
  progress,
  onRemove,
}: {
  file: File;
  progress?: number;
  onRemove: () => void;
}) {
  const pct = progress ?? COMPLETED_PROGRESS;

  return (
    <div className="relative flex gap-2 p-2 pr-4 w-full">
      {progress !== undefined && (
        <div
          className={cn(
            "absolute inset-0 bg-grey-50 transition-all duration-300 rounded-l-[12px]",
            pct > 90 && "rounded-[12px]"
          )}
          style={{ width: `${pct}%` }}
        />
      )}

      <div className="relative flex items-center gap-3 flex-1">
        <Image
          src={PDFIcon.src}
          width={40}
          height={40}
          alt="PDF"
          className="size-10"
        />

        <div className="flex flex-col w-full gap-1">
          <p className="text-base font-medium max-w-[300px] text-gray-900 leading-none truncate">
            {file.name}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{formatSize(file.size)}</span>
            {progress !== undefined && (
              <>
                <span className="mx-1 h-[3px] w-[3px] rounded-full bg-gray-300" />
                <span>
                  {pct < COMPLETED_PROGRESS ? `Uploading ${pct}%` : "Uploaded"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {progress !== undefined ? (
        <CircularProgressBar value={pct} size={32} strokeWidth={16} />
      ) : null}

      {progress === undefined && (
        <button
          onClick={onRemove}
          className="ml-2 text-gray-500 hover:text-red-500"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

function EmptyState() {
  const textT = useTranslations("Button&Text.UploadFile");
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6">
      <div className="flex size-12 rounded-lg items-center justify-center bg-grey-50">
        <CloudUpload className="size-6 text-blue-500" />
      </div>
      <p className="text-center text-sm text-black-400">
        <span className="font-semibold text-black-500">{textT("title")}</span>{" "}
        {textT("description")}
        <br />
        <span className="text-xs">DOCX, PDF&nbsp;(max&nbsp;500&nbsp;MB)</span>
      </p>
    </div>
  );
}
