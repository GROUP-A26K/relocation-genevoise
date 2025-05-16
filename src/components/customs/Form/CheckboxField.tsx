'use client';
import React, { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Controller, UseFormRegister } from 'react-hook-form';

type CheckboxFieldProps = {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  error?: string;
};

export const CheckboxField: FC<CheckboxFieldProps> = ({
  label,
  name,
  error,
}) => {
  return (
    <FormItem>
      <div className="flex flex-row items-start gap-1.5">
        <FormControl className="rounded-full">
          <Controller
            name={name}
            render={({ field }) => (
              <Checkbox
                id={name}
                className="rounded-full border border-blue-500 data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-white"
                {...field}
                onCheckedChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </FormControl>
        <FormLabel
          className="text-sm font-normal text-black-200 !leading-[130%] cursor-pointer"
          htmlFor={name}
        >
          {label}
        </FormLabel>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
