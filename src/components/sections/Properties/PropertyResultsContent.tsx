"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Pagination } from "@/components/blocks/Pagination";
import { PropertyCard } from "@/components/customs/Card";
import EmptyData from "@/components/customs/EmptyData";
import { Spinner } from "@/components/customs/Spinner/Spinner";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { Meta } from "@/models/Meta";
import { PropertyListing } from "@/models/Property";

interface IPropertiesProps {
  properties: PropertyListing[];
  meta: Meta;
  loading: boolean;
}

export default function PropertyResultsContent({
  properties,
  meta,
  loading,
}: IPropertiesProps) {
  const t = useTranslations("Properties");
  const { handlePageChange } = usePropertyFilters();

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="spinner"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && properties.length === 0 && (
          <motion.div
            key="noProperties"
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyData
              title={t("emptyData.title")}
              description={t("emptyData.description")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && properties.length > 0 && (
          <motion.div
            key="propertyList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && properties.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="pagination"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Pagination meta={meta} onClick={handlePageChange} />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
