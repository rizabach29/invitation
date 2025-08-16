"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export type TValue = {
  value: string;
  label: string;
};

export function Combobox({
  data,
  onChange,
  placeholder,
  className,
  defaultValue,
  onSearch,
}: {
  data: TValue[];
  onChange: (e: TValue) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: TValue;
  onSearch?: (e: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TValue | undefined>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value ? (
            value.label
          ) : (
            <span className="font-normal text-muted-foreground">
              Select item...
            </span>
          )}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[20rem] p-0 rounded-md">
        <Command className="rounded-md">
          <CommandInput
            placeholder={placeholder ?? "Search item..."}
            value={search}
            onValueChange={(e) => {
              setSearch(e);
              if (onSearch) onSearch(e);
            }}
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="w-full max-h-32 overflow-y-auto">
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => {
                  onChange(item);
                  setValue(item);
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div>{item.label}</div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
