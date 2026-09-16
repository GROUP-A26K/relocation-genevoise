import * as React from 'react';
import flags from 'react-phone-number-input/flags';
import * as RPNInput from 'react-phone-number-input';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
type PhoneInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    inputClassName?: string;
    countrySelectClassName?: string;
  };

const PhoneFieldWidthContext = React.createContext<number | undefined>(
  undefined
);

function PhoneInput({
  className,
  inputClassName,
  countrySelectClassName,
  onChange,
  value,
  defaultCountry = 'CH',
  ...props
}: PhoneInputProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isCountryOpen, setIsCountryOpen] = React.useState(false);
  const [fieldWidth, setFieldWidth] = React.useState<number>();

  const measureFieldWidth = React.useCallback(() => {
    setFieldWidth(wrapperRef.current?.getBoundingClientRect().width);
  }, []);

  const handleCountryOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) measureFieldWidth();
      setIsCountryOpen(open);
    },
    [measureFieldWidth]
  );

  React.useEffect(() => {
    measureFieldWidth();
    window.addEventListener('resize', measureFieldWidth);

    return () => window.removeEventListener('resize', measureFieldWidth);
  }, [measureFieldWidth]);

  const CountrySelectWithClassName = React.useMemo(() => {
    const Component = (selectProps: CountrySelectProps) => (
      <CountrySelect
        {...selectProps}
        className={countrySelectClassName ?? inputClassName}
        onOpenChange={handleCountryOpenChange}
      />
    );

    Component.displayName = 'CountrySelectWithClassName';
    return Component;
  }, [countrySelectClassName, inputClassName, handleCountryOpenChange]);

  return (
    <div
      ref={wrapperRef}
      data-slot="phone-input"
      data-country-open={isCountryOpen || undefined}
      className={cn(
        'group flex w-full rounded-3xl',
        'focus-within:ring-2 focus-within:ring-yellow-50 data-[country-open]:ring-2 data-[country-open]:ring-yellow-50',
        className
      )}
    >
      <PhoneFieldWidthContext.Provider value={fieldWidth}>
        <RPNInput.default
          className="flex w-full"
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
          onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
          {...props}
        />
      </PhoneFieldWidthContext.Provider>
    </div>
  );
}

type InputComponentProps = RPNInput.DefaultInputComponentProps & {
  className?: string;
  inputClassName?: string;
};

function InputComponent({
  className,
  inputClassName,
  ...props
}: InputComponentProps) {
  return (
    <Input
      data-slot="input-component"
      className={cn(
        'h-10 rounded-s-none rounded-e-3xl border border-l-0 border-gray-200 text-sm text-black-50 shadow-none placeholder:text-black-50',
        'group-hover:border-black-50 group-has-[input:hover]:border-black-50',
        'disabled:group-hover:border-gray-200 disabled:group-has-[input:hover]:border-gray-200',
        'group-focus-within:border-yellow-500! group-focus-within:text-black-50 group-data-[country-open]:border-yellow-500',
        'focus-visible:ring-0 focus-visible:outline-none',
        className,
        inputClassName
      )}
      {...props}
    />
  );
}
const PRIORITY_COUNTRY_CODES: readonly RPNInput.Country[] = [
  'CH',
  'FR',
  'GB',
  'BE',
  'US',
  'IT',
  'ES',
  'PT',
];

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  className?: string;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  onOpenChange?: (open: boolean) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  className,
  onChange,
  onOpenChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const fieldWidth = React.useContext(PhoneFieldWidthContext);
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
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        onOpenChange?.(open);
        if (open) setSearchValue('');
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'flex h-10 cursor-pointer items-center gap-2 rounded-s-3xl rounded-e-none border border-r-0 border-gray-200 bg-white px-3 text-sm text-black-50 shadow-none',
            'group-hover:border-black-50 group-has-[input:hover]:border-black-50 hover:bg-white hover:text-black-50',
            'group-focus-within:border-yellow-500! group-focus-within:text-black-50 group-data-[country-open]:border-yellow-500',
            'focus-visible:ring-0 focus-visible:outline-none',
            disabled &&
              'bg-black-25 cursor-not-allowed text-black-200 group-hover:border-gray-200 group-has-[input:hover]:border-gray-200',
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
              '-mr-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        style={{ width: fieldWidth }}
        className="rounded-2xl border border-gray-100 p-0"
      >
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-radix-scroll-area-viewport]'
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
                      onSelectComplete={() => {
                        setIsOpen(false);
                        onOpenChange?.(false);
                      }}
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
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
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
