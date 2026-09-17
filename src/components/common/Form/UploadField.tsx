'use client';
import Image from 'next/image';
import { isNil } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { cn } from '@/libs/utils';
import { Input } from '@/components/ui/input';
import PDFIcon from '@/assets/icons/file-pdf.svg';
import { cn as typographyCn } from '@/components/common/Text/utils';
import BodyText, { bodyTextVariants } from '@/components/common/Text/BodyText';
import { CircularProgressBar } from '@/components/common/Progress/CircularProgressBar';

import { FormField } from './FormField';

const COMPLETED_PROGRESS = 100;

type TUploadState = {
  file: File;
  progress: number;
  timerId: NodeJS.Timeout;
};

interface IUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  onChange: (file: File | null) => void;
  isRequired?: boolean;
  error?: string;
}

const formatSize = (bytes: number) => `${Math.round(bytes / 1000)} KB`;

export const UploadField = <TFieldValues extends FieldValues = FieldValues>({
  label,
  isRequired,
  error,
  onChange,
  className,
  ...props
}: IUploadFieldProps<TFieldValues>) => {
  const [upload, setUpload] = useState<TUploadState | null>(null);
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
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
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
        render={() => (
          <div className="w-full">
            <label
              {...getRootProps()}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-[12px] border border-gray-200 hover:border-black-50"
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

interface IFileCardProps {
  file: File;
  progress?: number;
  onRemove: () => void;
}

function FileCard({ file, progress, onRemove }: IFileCardProps) {
  const pct = progress ?? COMPLETED_PROGRESS;

  return (
    <div className="relative flex w-full gap-2 p-2 pr-4">
      {!isNil(progress) && (
        <div
          className={cn(
            'absolute inset-0 rounded-l-[12px] bg-grey-50 transition-all duration-300',
            pct > 90 && 'rounded-[12px]'
          )}
          style={{ width: `${pct}%` }}
        />
      )}

      <div className="relative flex flex-1 items-center gap-3">
        <Image
          src={PDFIcon.src}
          width={40}
          height={40}
          alt="PDF"
          className="size-10"
        />

        <div className="flex w-full flex-col gap-1">
          <BodyText
            className={typographyCn(
              'text-[length:inherit] leading-[150%] font-[number:inherit] text-nowrap text-inherit',
              'max-w-[300px] truncate text-base leading-none font-medium text-gray-900'
            )}
          >
            {file.name}
          </BodyText>
          <div
            className={cn(
              bodyTextVariants(),
              'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
              'flex items-center text-sm text-gray-500'
            )}
          >
            <BodyText
              asChild
              className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit"
            >
              <span>{formatSize(file.size)}</span>
            </BodyText>
            {!isNil(progress) && (
              <>
                <span className="mx-1 h-[3px] w-[3px] rounded-full bg-gray-300" />
                <BodyText
                  asChild
                  className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit"
                >
                  <span>
                    {pct < COMPLETED_PROGRESS
                      ? `Uploading ${pct}%`
                      : 'Uploaded'}
                  </span>
                </BodyText>
              </>
            )}
          </div>
        </div>
      </div>

      {!isNil(progress) ? (
        <CircularProgressBar value={pct} size={32} strokeWidth={16} />
      ) : null}

      {isNil(progress) && (
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
  const textT = useTranslations('Button&Text.UploadFile');
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6">
      <div className="flex size-12 items-center justify-center rounded-lg bg-grey-50">
        <CloudUpload className="size-6 text-blue-500" />
      </div>
      <BodyText
        className={typographyCn(
          'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
          'text-center text-sm text-black-400'
        )}
      >
        <BodyText
          asChild
          className={typographyCn(
            'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
            'font-semibold text-black-500'
          )}
        >
          <span>{textT('title')}</span>
        </BodyText>{' '}
        {textT('description')}
        <br />
        <BodyText
          asChild
          className={typographyCn(
            'text-[length:inherit] leading-[calc(1/0.75)] font-[number:inherit] text-inherit',
            'text-xs'
          )}
        >
          <span>DOCX, PDF&nbsp;(max&nbsp;500&nbsp;MB)</span>
        </BodyText>
      </BodyText>
    </div>
  );
}
