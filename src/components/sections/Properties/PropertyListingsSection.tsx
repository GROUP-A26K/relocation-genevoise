"use client";

import { FC, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useBoolean } from "usehooks-ts";

import {
  PROPERTY_PAGE_SIZE,
  usePropertyFilters,
} from "@/hooks/usePropertyFilters";
import { Meta } from "@/models/Meta";
import { PropertyListing } from "@/models/Property";
import {
  PropertyParamsProps,
  fetchProperties,
} from "@/services/property.service";

import { PropertyResultsContent } from "./PropertyResultsContent";
import { PropertyResultsHeader } from "./PropertyResultsHeader";

const INITIAL_DATA: { properties: PropertyListing[]; meta: Meta } = {
  properties: [],
  meta: {
    pagination: {
      page: 1,
      pageSize: PROPERTY_PAGE_SIZE,
      pageCount: 0,
      total: 0,
    },
  },
};

export const PropertyListingsSection: FC = () => {
  const locale = useLocale();
  const { filterParams } = usePropertyFilters();

  const [data, setData] = useState(INITIAL_DATA);
  const {
    value: loading,
    setTrue: setLoadingTrue,
    setFalse: setLoadingFalse,
  } = useBoolean(false);

  useEffect(() => {
    let isActive = true;

    const loadProperties = async (params: PropertyParamsProps) => {
      setLoadingTrue();

      try {
        const result = await fetchProperties(params);

        if (isActive) {
          setData(result);
        }
      } finally {
        if (isActive) {
          setLoadingFalse();
        }
      }
    };

    void loadProperties({
      ...filterParams,
      locale,
    });

    return () => {
      isActive = false;
    };
  }, [filterParams, locale, setLoadingFalse, setLoadingTrue]);

  return (
    <section className="flex flex-col items-center 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4">
      <div className="w-full max-w-[1240px]">
        <PropertyResultsHeader {...data.meta.pagination} />
        <PropertyResultsContent
          properties={data.properties}
          meta={data.meta}
          loading={loading}
        />
      </div>
    </section>
  );
};
