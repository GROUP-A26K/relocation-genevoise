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

import type { ApplicationFormInput } from '@/validations/application.validation';

interface UserInfo extends Omit<
  ApplicationFormInput,
  'resume_file ' | 'accept ' | 'expected_ctc'
> {
  resume_url: string;
  expected_ctc: number | undefined;
}
interface ApplicationProps {
  userInfo: UserInfo;
  baseUrl: string;
  locale: 'en' | 'fr';
}

const copy = {
  en: {
    heading: 'Application information',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    expected_ctc: 'Expected CTC',
    experience_years: 'Experience years',
    department: 'Department',
    position: 'Position',
    resume_url: 'Resume URL',
    user_cv: 'User CV',
  },
  fr: {
    heading: 'Informations de candidature',
    name: 'Nom',
    email: 'E-mail',
    phone: 'Téléphone',
    expected_ctc: 'CTC attendu',
    experience_years: 'Années expérience',
    department: 'Département',
    position: 'Poste',
    resume_url: 'URL du CV',
    user_cv: 'CV de l’utilisateur',
  },
} as const;

export const ApplicationInformation = ({
  userInfo,
  baseUrl,
  locale = 'en',
}: ApplicationProps) => {
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
                    src={`${baseUrl}rg-logo.png`}
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
                          src={`${baseUrl}globe-lucid.png`}
                          width="13"
                          className="my-auto ml-auto"
                          height="13"
                          alt="Globe icon"
                        />
                        <Text className="ml-1 text-xs leading-[100%]! font-semibold text-[#605204]">
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
              className="m-8 mb-6 text-start text-3xl leading-[130%]! font-semibold text-[#605204]"
              dangerouslySetInnerHTML={{ __html: t.heading }}
            />

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.name}:{' '}
              <strong>
                {userInfo.first_name} {userInfo.last_name}
              </strong>
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.email}: <strong>{userInfo.email}</strong>
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.phone}: <strong>{userInfo.phone}</strong>
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.experience_years}: <strong>{userInfo.experience_years}</strong>
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.expected_ctc}:<strong>{userInfo?.expected_ctc}</strong>
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.department}: <strong>{userInfo.department}</strong>
            </Text>
            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.position}: <strong>{userInfo.position}</strong>
            </Text>

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.resume_url}:{' '}
              <Link href={userInfo.resume_url}>
                <strong className="text-[#D7BC12]">{t.user_cv}</strong>
              </Link>
            </Text>

            {/* ---------- Footer ---------- */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ApplicationInformation.PreviewProps = {
  userInfo: {
    first_name: 'Gavin',
    last_name: 'Tran',
    email: '2Kw7M@example.com',
    phone: '000-000-0000',
    experience_years: '5',
    department: 'Engineering',
    position: 'Software Engineer',
    resume_url: 'https://example.com/resume.pdf',
  },
  baseUrl: 'https://relocation-genevoise.vercel.app/',
  locale: 'en',
} as ApplicationProps;
export default ApplicationInformation;
