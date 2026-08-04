"use client";

import { useTransition } from "react";

import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { useExchangeRates } from "@/context/ExchangeRatesContext";
import { Meta } from "@/models/Meta";
import { IPropertyListing } from "@/models/Property";

import PropertyResultsContent from "./PropertyResultsContent";
import PropertyResultsHeader from "./PropertyResultsHeader";

interface Props {
  properties: IPropertyListing[];
  meta: Meta;
}

export default function PropertyListingsSection({ properties, meta }: Props) {
  const { convertToCHF } = useExchangeRates();
  const [isPending, startTransition] = useTransition();

  usePropertyFilters(convertToCHF, startTransition);

  return (
    <section className="flex flex-col items-center 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4">
      <div className="w-full max-w-[1240px]">
        <PropertyResultsHeader {...meta.pagination} />
        <PropertyResultsContent
          properties={properties}
          meta={meta}
          loading={isPending}
        />
      </div>
    </section>
  );
}
