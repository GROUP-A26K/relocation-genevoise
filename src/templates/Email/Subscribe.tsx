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

interface SubscribeProps {
  subject: string;
  baseUrl: string;
  locale: 'en' | 'fr';
}

/* ─────────── textual content only ─────────── */
const copy = {
  en: {
    preview: 'Welcome to our service!',
    headingPrefix: 'Welcome to Relocation Genevoise',
    hi: 'Hi',
    thanks:
      'Thank you for subscribing to the Relocation Genevoise newsletter! We’re excited to have you on board.',
    fromNow: 'From now on, you’ll receive',
    teamReview:
      'The Support team will review your ticket and get back to you shortly.',
    card1: 'Industry news and insights',
    card2: 'Tips and resources',
    card3: 'Exclusive offers and updates',
    respect:
      'We respect your inbox — expect only relevant and valuable content from us. If you ever wish to unsubscribe, you can do so at any time using the link at the bottom of our emails.',
    welcomeAgain: 'Welcome again, and stay tuned!',
    regards: 'Warm regards,',
    team: 'The Relocation Genevoise Team',
    footer:
      'This email was sent to <strong>contact@relocation-genevoise.ch</strong> because you signed up to receive newsletter from Relocation Genevoise',
    contactUs: 'Contact us',
    privacy: 'Privacy policy',
    unsubscribe: 'Unsubscribe',
  },
  fr: {
    preview: 'Bienvenue dans notre service !',
    headingPrefix: 'Bienvenue chez Relocation Genevoise',
    hi: 'Bonjour',
    thanks:
      'Merci de vous être abonné à la newsletter d’Relocation Genevoise ! Nous sommes ravis de vous compter parmi nous.',
    fromNow: 'Désormais, vous recevrez',
    teamReview:
      'Notre équipe d’assistance examinera votre demande et vous répondra sous peu.',
    card1: 'Actualités et analyses du secteur',
    card2: 'Conseils et ressources',
    card3: 'Offres exclusives et mises à jour',
    respect:
      'Nous respectons votre boîte mail : vous ne recevrez que du contenu pertinent et utile. Vous pouvez vous désabonner à tout moment grâce au lien figurant en bas de nos e-mails.',
    welcomeAgain: 'Encore une fois bienvenue, restez connecté !',
    regards: 'Cordialement,',
    team: 'L’équipe Relocation Genevoise',
    footer:
      'Cet e-mail a été envoyé à <strong>contact@relocation-genevoise.ch</strong> car vous vous êtes inscrit pour recevoir la newsletter d’Relocation Genevoise',
    contactUs: 'Nous contacter',
    privacy: 'Politique de confidentialité',
    unsubscribe: 'Se désabonner',
  },
} as const;

/* ─────────── component ─────────── */
export const Subscribe = ({
  subject,
  baseUrl,
  locale = 'en',
}: SubscribeProps) => {
  const t = copy[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto max-w-[600px]">
            {/* header */}
            <Section className="px-[32px] py-[40px]">
              <Row>
                <Column className="w-[50%]">
                  <Img
                    src={`${baseUrl}/rg-logo.png`}
                    width="93.26"
                    height="36"
                    alt="Logo"
                  />
                </Column>
                <Column align="right">
                  <Row align="right">
                    <Link href="https://relocation-genevoise.ch">
                      <div style={{ width: '100%', display: 'flex' }}>
                        <Img
                          src={`${baseUrl}/globe-lucid.png`}
                          width="13"
                          height="13"
                          className="my-auto ml-auto"
                          alt="Globe"
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

            {/* hero heading */}
            <Heading className="text-[#7C6C06] text-3xl font-semibold !leading-[130%] text-start m-8 mb-6">
              {t.headingPrefix} <br />
              {subject}
            </Heading>

            {/* paragraphs */}
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.hi},
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.thanks}
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.fromNow}
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.teamReview}
            </Text>

            {/* three cards */}
            <Row cellSpacing={16} className="px-4 h-fit">
              {[
                { img: 'chart-pie-slice-lucid.png', text: t.card1 },
                { img: 'lightbulb-filament-lucid.png', text: t.card2 },
                { img: 'gift-lucid.png', text: t.card3 },
              ].map(({ img, text }) => (
                <Column
                  key={img}
                  align="center"
                  className="w-1/3"
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '10%',
                    padding: '12px 12px 12px 12px',
                  }}
                >
                  <Img
                    src={`${baseUrl}/${img}`}
                    width="40"
                    height="40"
                    alt=""
                    style={{
                      backgroundColor: '#E2F2E6',
                      borderRadius: '20%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Text className="text-black text-[14px] font-semibold leading-[24px] mt-4 mb-auto h-[48px]">
                    {text}
                  </Text>
                </Column>
              ))}
            </Row>

            {/* closing paragraphs */}
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.respect}
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.welcomeAgain}
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8 mb-0">
              {t.regards}
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8 mt-0">
              <strong>{t.team}</strong>
            </Text>

            {/* footer */}
            <Section
              className="p-8"
              style={{
                background: 'linear-gradient(90deg, #F8E166 0%, #FDF6D3 100%)',
                padding: '20px',
                borderRadius: '0 30px 0 0',
              }}
            >
              <Text
                className="text-[#605204] text-[14px] leading-[24px] text-center"
                dangerouslySetInnerHTML={{ __html: t.footer }}
              />

              <Row>
                {/* Left column: icons + info */}
                <Column colSpan={4}>
                  {/* phone */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}/phone-call-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Phone"
                      />
                      <Text className="text-[#605204] text-xs font-semibold !leading-[100%] my-0 ml-1 mr-auto">
                        +1 (555) 000-0000
                      </Text>
                    </div>
                  </Link>

                  {/* website */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}/globe-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Globe"
                      />
                      <Text className="text-[#605204] text-xs font-semibold !leading-[100%]  my-3 ml-1 mr-auto">
                        https://relocation-genevoise/ch
                      </Text>
                    </div>
                  </Link>

                  {/* address */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}/buildings-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Building"
                      />
                      <Text className="text-[#605204] text-xs font-semibold !leading-[100%] my-0 ml-1 mr-auto">
                        Rue des Alpes 5, 1201 Geneva
                      </Text>
                    </div>
                  </Link>
                </Column>

                {/* Right column: links */}
                <Column colSpan={4}>
                  <Link href="https://relocation-genevoise.ch/contact">
                    <Text className="text-[#605204] text-xs font-semibold !leading-[100%] ml-auto mr-5">
                      {t.contactUs}
                    </Text>
                  </Link>

                  <Link href="https://relocation-genevoise.ch/mentions-legales">
                    <Text className="text-[#605204] text-xs font-semibold !leading-[100%] my-3 ml-auto">
                      {t.privacy}
                    </Text>
                  </Link>

                  <Text className="text-[#605204] text-xs font-semibold !leading-[100%] ml-auto mr-2">
                    {t.unsubscribe}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

Subscribe.PreviewProps = {
  subject: 'Vous êtes à présent bien inscrit.',
  baseUrl: 'http://localhost:3000/',
  locale: 'fr',
} as SubscribeProps;
export default Subscribe;
