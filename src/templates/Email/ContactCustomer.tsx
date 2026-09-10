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

import type { ContactFormInput } from '@/validations/contact.validation';

interface ContactProps {
  userInfo: ContactFormInput;
  baseUrl: string;
  locale: 'en' | 'fr';
}

const copy = {
  en: {
    heading: 'Customer information',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    company: 'Company',
    message: 'Message',
  },
  fr: {
    heading: 'Informations client',
    name: 'Nom',
    email: 'E-mail',
    phone: 'Téléphone',
    subject: 'Sujet',
    company: 'Société',
    message: 'Message',
  },
} as const;

export const ContactCustomer = ({
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
              {t.name}:{' '}
              <strong>
                {userInfo.first_name} {userInfo.last_name}
              </strong>
              ,
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.email}: <strong>{userInfo.email}</strong>,
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.phone}: <strong>{userInfo.phone}</strong>,
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.subject}: <strong>{userInfo.subject}</strong>,
            </Text>

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.company}: <strong>{userInfo.company}</strong>,
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.message}: <strong>{userInfo.message}</strong>,
            </Text>

            {/* ---------- Footer ---------- */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactCustomer.PreviewProps = {
  userInfo: {
    first_name: 'Gavin',
    last_name: 'Tran',
    email: '2Kw7M@example.com',
    phone: '000-000-0000',
    message: 'Hello, this is a test message.',
    subject: 'Test Subject',
    company: 'Test Company',
  },
  baseUrl: 'http://localhost:3000/',
  locale: 'fr',
} as ContactProps;
export default ContactCustomer;
