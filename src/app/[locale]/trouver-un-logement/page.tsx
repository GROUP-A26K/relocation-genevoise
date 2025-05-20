export const dynamic = "force-dynamic";
import { HomeHero } from "@/components/blocks/Hero";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";
import { PageView } from "@/components/sections/FindAccommodation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Home",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  });

  return (
    <>
      <PageView />
      {/* <Section isDivider className="relative">
        <HomeHero
          heading={t("Hero.heading")}
          subHeading={t("Hero.subHeading")}
          description={t("Hero.description")}
          button={{
            text: t("Hero.buttonText"),
            url: "/rappelez-moi",
          }}
          button2={{
            text: t("Hero.buttonText2"),
            url: "/contact",
          }}
        />
      </Section>

      <Section isDivider className="relative">
        <div className="container">
          <div className="mx-auto w-full max-w-5xl md:px-10">
            <div className="flex flex-col gap-16">
              <div className="relative flex flex-col gap-8">
                <div className="absolute top-4 hidden h-full w-0.5 md:-left-12 md:block lg:-left-14">
                  <div className="h-full w-full rounded-full bg-muted">
                    <div
                      className="relative max-h-full w-full rounded-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary transition-all duration-300"
                      style={{ height: "30%" }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute top-0 hidden size-12 -translate-x-1/2 place-items-center rounded-full border bg-background md:-left-12 md:grid lg:-left-[55px]">
                    1
                  </span>
                  <div className="flex flex-col max-w-fit gap-8">
                    <div className="flex flex-col lg:gap-3 gap-4 max-w-[560px] text-left">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-semibold !leading-[130%]">
                          Infrastructure and Security Updates
                        </h2>
                      </div>
                      <p className="text-sm font-normal text-black-200 !leading-[130%]">
                        We&apos;ve made significant improvements to our
                        infrastructure and security measures to ensure a more
                        robust and secure platform.
                      </p>
                    </div>
                    <Image
                      src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80"
                      alt="placeholder"
                      width={560}
                      height={280}
                      className="aspect-video rounded-md border border-border object-cover"
                    />
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute top-0 hidden size-12 -translate-x-1/2 place-items-center rounded-full border bg-background md:-left-12 md:grid lg:-left-[55px]">
                    1
                  </span>
                  <div className="flex flex-col max-w-fit gap-8">
                    <div className="flex flex-col lg:gap-3 gap-4 max-w-[560px] text-left">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-semibold !leading-[130%]">
                          Infrastructure and Security Updates
                        </h2>
                      </div>
                      <p className="text-sm font-normal text-black-200 !leading-[130%]">
                        We&apos;ve made significant improvements to our
                        infrastructure and security measures to ensure a more
                        robust and secure platform.
                      </p>
                    </div>
                    <Image
                      src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80"
                      alt="placeholder"
                      width={560}
                      height={280}
                      className="aspect-video rounded-md border border-border object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section> */}
    </>
  );
}
