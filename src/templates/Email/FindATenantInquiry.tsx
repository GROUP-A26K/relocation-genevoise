import * as React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type TInquiryAudience = "landlord" | "tenant";

interface InquiryUserInfo {
  full_name: string;
  email: string;
  phone: string;
  property_address: string;
  property_type: string;
  number_of_rooms: string;
  additional_info?: string;
}

interface FindATenantInquiryProps {
  audience: TInquiryAudience;
  userInfo: InquiryUserInfo;
  baseUrl: string;
  locale: "en" | "fr";
}

const copy = {
  en: {
    landlord: "New landlord inquiry",
    tenant: "New tenant inquiry",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    propertyType: "Property type",
    rooms: "Number of rooms",
    additionalInfo: "Additional information",
  },
  fr: {
    landlord: "Nouvelle demande propriétaire",
    tenant: "Nouvelle demande locataire",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    address: "Adresse",
    propertyType: "Type de bien",
    rooms: "Nombre de pièces",
    additionalInfo: "Informations complémentaires",
  },
} as const;

export const FindATenantInquiry = ({
  audience,
  userInfo,
  baseUrl,
  locale = "en",
}: FindATenantInquiryProps) => {
  const t = copy[locale];
  const heading = audience === "landlord" ? t.landlord : t.tenant;

  return (
    <Html>
      <Head />
      <Preview>{heading}</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto max-w-[600px]">
            <Section className="px-[32px] py-[40px]">
              <Row>
                <Column className="w-[50%]">
                  <Img
                    src={`${baseUrl}/rg-logo.png`}
                    width="93.26"
                    height="36"
                    alt="Relocation Genevoise logo"
                  />
                </Column>

                <Column align="right">
                  <Row align="right">
                    <Link href="https://relocation-genevoise.ch">
                      <div style={{ display: "flex" }}>
                        <Img
                          src={`${baseUrl}/globe-lucid.png`}
                          width="13"
                          className="my-auto ml-auto"
                          height="13"
                          alt="Globe icon"
                        />
                        <Text className="text-[#7C6C06] text-xs font-semibold !leading-[100%] ml-1">
                          https://relocation-genevoise/ch
                        </Text>
                      </div>
                    </Link>
                  </Row>
                </Column>
              </Row>
            </Section>

            <Heading className="text-[#7C6C06] text-3xl font-semibold !leading-[130%] text-start m-8 mb-6">
              {heading}
            </Heading>

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.name}: <strong>{userInfo.full_name}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.email}: <strong>{userInfo.email}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.phone}: <strong>{userInfo.phone}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.address}: <strong>{userInfo.property_address}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.propertyType}: <strong>{userInfo.property_type}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.rooms}: <strong>{userInfo.number_of_rooms}</strong>
            </Text>
            {userInfo.additional_info ? (
              <Text className="text-black text-[14px] leading-[24px] px-8">
                {t.additionalInfo}: <strong>{userInfo.additional_info}</strong>
              </Text>
            ) : null}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

FindATenantInquiry.PreviewProps = {
  audience: "landlord",
  userInfo: {
    full_name: "Gavin Tran",
    email: "2Kw7M@example.com",
    phone: "+41 22 715 17 48",
    property_address: "Rue du Rhône 1, Genève",
    property_type: "apartment",
    number_of_rooms: "3",
    additional_info: "Available from next month.",
  },
  baseUrl: "http://localhost:3000",
  locale: "fr",
} as FindATenantInquiryProps;

export default FindATenantInquiry;
