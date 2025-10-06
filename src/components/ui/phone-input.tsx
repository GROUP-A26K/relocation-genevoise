import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command-custom";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils";
type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    inputClassName?: string;
    countrySelectClassName?: string;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    (
      {
        className,
        inputClassName,
        countrySelectClassName,
        onChange,
        value,
        defaultCountry = "CH",
        ...props
      },
      ref
    ) => {
      const CountrySelectWithClassName = React.useMemo(() => {
        const Component = (selectProps: CountrySelectProps) => (
          <CountrySelect
            {...selectProps}
            className={countrySelectClassName ?? inputClassName}
          />
        );

        Component.displayName = "CountrySelectWithClassName";
        return Component;
      }, [countrySelectClassName, inputClassName]);

      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex w-full", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelectWithClassName}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          defaultCountry={defaultCountry}
          inputClassName={inputClassName}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

type InputComponentProps = RPNInput.DefaultInputComponentProps & {
  className?: string;
  inputClassName?: string;
};

const InputComponent = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className, inputClassName, ...props }, ref) => (
    <Input
      className={cn(
        "h-10 rounded-e-[1.5rem] rounded-s-none border border-l-0 border-gray-200 text-sm text-black-50 shadow-none placeholder:text-black-50",
        "hover:border-black-50 focus-visible:border-yellow-500 focus-visible:text-black-50 focus-visible:ring-2 focus-visible:ring-yellow-50 focus-visible:ring-offset-0",
        className,
        inputClassName
      )}
      {...props}
      ref={ref}
    />
  )
);
InputComponent.displayName = "InputComponent";

const PRIORITY_COUNTRY_CODES: readonly RPNInput.Country[] = [
  "CH",
  "FR",
  "GB",
  "BE",
  "US",
  "IT",
  "ES",
  "PT",
];

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  className?: string;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  className,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const orderedCountryList = React.useMemo(() => {
    const prioritySet = new Set(PRIORITY_COUNTRY_CODES);
    const prioritized = PRIORITY_COUNTRY_CODES.flatMap((code) => {
      const matchedOption = countryList.find(({ value }) => value === code);
      return matchedOption && matchedOption.value ? [matchedOption] : [];
    });
    const remaining = countryList.filter(
      (option) => !option.value || !prioritySet.has(option.value)
    );

    return [...prioritized, ...remaining];
  }, [countryList]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        open && setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "flex h-10 items-center gap-2 rounded-s-[1.5rem] rounded-e-none border border-gray-200 border-r-0 bg-white px-3 text-sm text-black-50 shadow-none",
            "hover:border-black-50 focus-visible:border-yellow-500 focus-visible:text-black-50 focus-visible:ring-2 focus-visible:ring-yellow-50 focus-visible:ring-offset-0",
            disabled && "bg-black-25 text-black-200",
            className
          )}
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] rounded-2xl border border-gray-100 p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {orderedCountryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2 " onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
