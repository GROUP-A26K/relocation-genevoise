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

import { getImageMessages } from '@/utils/imageMessages';

import type { TApplicationFormInput } from '@/validations/application.validation';

export type TApplicationUserInfo = Pick<
  TApplicationFormInput,
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'experience_years'
  | 'department'
  | 'position'
> & {
  resume_file_name: string;
  expected_ctc?: number;
};

interface IApplicationInformationProps {
  userInfo: TApplicationUserInfo;
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
    resume: 'Résumé',
    attached: 'attached to this email',
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
    resume: 'CV',
    attached: 'en pièce jointe de cet e-mail',
  },
} as const;

export const ApplicationInformation = ({
  userInfo,
  baseUrl,
  locale = 'en',
}: IApplicationInformationProps) => {
  const t = copy[locale];
  const imageT = getImageMessages(locale);

  return (
    <Html lang={locale}>
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
                    alt={imageT.email.logo}
                    title={imageT.email.logo}
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
                          alt=""
                        />
                        <Text className="ml-1 text-xs leading-[100%] font-semibold text-[#605204]">
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
              className="m-8 mb-6 text-start text-3xl leading-[130%] font-semibold text-[#605204]"
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
              {t.resume}: <strong>{userInfo.resume_file_name}</strong> (
              {t.attached})
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
    resume_file_name: 'gavin-tran-resume.pdf',
  },
  baseUrl: 'https://relocation-genevoise.vercel.app/',
  locale: 'en',
} as IApplicationInformationProps;
export default ApplicationInformation;
