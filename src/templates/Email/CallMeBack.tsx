import * as React from 'react';
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
} from '@react-email/components';

import type { BookingFormInput } from '@/validations/booking.validation';

interface ContactProps {
  userInfo: BookingFormInput;
  baseUrl: string;
  locale: 'en' | 'fr';
}

const copy = {
  en: {
    heading: 'Booking information',
    phone: 'Phone',
    contactVia: 'Contact via',
  },
  fr: {
    heading: 'Informations de rendez-vous',
    phone: 'Téléphone',
    contactVia: 'Contact par',
  },
} as const;

export const CallMeBack = ({
  userInfo,
  baseUrl,
  locale = 'en',
}: ContactProps) => {
  const t = copy[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.heading}</Preview>

      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] rounded border border-solid border-[#eaeaea]">
            {/* ---------- Header ---------- */}
            <Section className="px-[32px] py-[40px]">
              <Row>
                <Column className="w-[50%]">
                  <Img
                    src={`${baseUrl}/rg-logo.png`}
                    width="93.26"
                    height="36"
                    alt="React Email logo"
                  />
                </Column>

                <Column align="right">
                  <Row align="right">
                    <Link href="https://relocation-genevoise.ch">
                      <div style={{ display: 'flex' }}>
                        <Img
                          src={`${baseUrl}/globe-lucid.png`}
                          width="13"
                          className="my-auto ml-auto"
                          height="13"
                          alt="Globe icon"
                        />
                        <Text className="ml-1 text-xs leading-[100%]! font-semibold text-[#7C6C06]">
                          https://relocation-genevoise/ch
                        </Text>
                      </div>
                    </Link>
                  </Row>
                </Column>
              </Row>
            </Section>

            {/* ---------- Main copy ---------- */}
            <Heading
              className="m-8 mb-6 text-start text-3xl leading-[130%]! font-semibold text-[#7C6C06]"
              dangerouslySetInnerHTML={{ __html: t.heading }}
            />

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.phone}: <strong>{userInfo.phone}</strong>,
            </Text>

            <Text className="mb-8 px-8 text-[14px] leading-[24px] text-black">
              {t.contactVia}:{' '}
              <strong>
                {userInfo.contactVia === 'telephone' ? t.phone : 'Whatsapp'}
              </strong>
              .
            </Text>

            {/* ---------- Footer ---------- */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

CallMeBack.PreviewProps = {
  userInfo: {
    phone: '000-000-0000',
  },
  baseUrl: 'http://localhost:3000/',
  locale: 'fr',
} as ContactProps;
export default CallMeBack;
