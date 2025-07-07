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
import { ApplicationFormInput } from '@/validations/application.validation';

interface UserInfo
  extends Omit<
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
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto max-w-[600px]">
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
                        <Text className="text-[#605204] text-xs font-semibold !leading-[100%] ml-1">
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
              className="text-[#605204] text-3xl font-semibold !leading-[130%] text-start m-8 mb-6"
              dangerouslySetInnerHTML={{ __html: t.heading }}
            />

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.name}:{' '}
              <strong>
                {userInfo.first_name} {userInfo.last_name}
              </strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.email}: <strong>{userInfo.email}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.phone}: <strong>{userInfo.phone}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.experience_years}: <strong>{userInfo.experience_years}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.expected_ctc}:<strong>{userInfo?.expected_ctc}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.department}: <strong>{userInfo.department}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.position}: <strong>{userInfo.position}</strong>
            </Text>

            <Text className="text-black text-[14px] leading-[24px] px-8">
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
