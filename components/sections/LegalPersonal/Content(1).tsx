'use client';

import {
  List,
  Paragraph,
  BoldText,
  LinkText,
  ListItem,
} from '@/components/customs/Text';

export const Content = () => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto w-full 2xl:max-w-[720px] xl:max-w-[620px] lg:max-w-[470px] max-w-[720px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col">
        <div className="flex flex-col gap-4">
          <Paragraph>
            Chez <BoldText>AG Insurance Geneva SA</BoldText> we pay particular
            attention to respecting your privacy. Thank you for’ using our
            services and our website. We take your privacy seriously. This
            privacy policy concerns any natural person sharing his personal data
            directly or indirectly with AG Assurance Genevoise SA by visiting
            this website.
          </Paragraph>

          <Paragraph>
            <BoldText>AG Insurance Geneva SA</BoldText> AG Insurance Geneva
            SA is a public limited company established in Switzerland and
            registered at Rue des Alpes 5, 1201 Geneva. As such, we adhere to
            the nLPD (new Law on the Protection of Data). Our head office is
            located at Rue des Alpes 5, 1201 Geneva. You can inform us of your
            questions regarding data protection at the following address:
            <LinkText> contact@assurance-genevoise.ch</LinkText> This privacy
            policy details the types of personal data that are likely to be
            processed and for their purpose.
          </Paragraph>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="lg:text-2xl text-xl font-bold !leading-[130%]">
            Perimeter of the charter of confidentiality
          </h2>

          <Paragraph>
            Please note that this confidentiality charter concerns the
            processing of personal data of which Ag Insurance Geneva SA is the
            controller. This confidentiality charter does not concern any
            processing of personal data that AG AG Insurance Geneva SA can
            perform as a subcontractor arising from your use of our services. To
            obtain more information on how our services can be used to
            facilitate your processing of personal data, and on the
            responsibilities and commitments of the Geneva Assurance SA in
            relation to them, please refer to the applicable conditions. We
            apply the NLPD (new data protection law) for all of our procedures.,
          </Paragraph>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="lg:text-2xl text-xl font-bold !leading-[130%]">
            Processed personal data
          </h2>

          <Paragraph>
            Personal data refers to data that identifies you as a natural
            person. We may be required to process the following types of
            personal data about you: Your contact information may include your
            name, email address and phone number. User information, for example,
            if you log in to our service or visit our websites. This information
            may include IP number, device type and browser, time zone, location,
            as well as your interests and preferences, information about how you
            interact with our services, for example about the features used and
            the buttons clicked.
          </Paragraph>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="lg:text-2xl text-xl font-bold !leading-[130%]">
            Finalities of the treatment of donees
          </h2>

          <Paragraph>
            We may need to process your personal data for the following
            purposes:
            <List>
              <ListItem>
                Provide our services in accordance with applicable terms;
              </ListItem>
              <ListItem>
                Administer the’affaires relationship with you and the AG
                Assurance Genevoise SA client you represent;
              </ListItem>
              <ListItem>Develop and improve our services;</ListItem>
            </List>
            In order to provide information and offers to current or potential
            AG Assurance Genevoise SA customers about our solution by selected
            third parties. Any marketing material distributed with the help of
            your personal data is sent to you as a legal person representing a
            current or potential customer of AG Assurance Genevoise SA and not
            to you as a private person.
          </Paragraph>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="lg:text-2xl text-xl font-bold !leading-[130%]">
            Sharing with third parties and transfer to the third countries{' '}
          </h2>

          <Paragraph>
            <List>
              <ListItem>
                Google Analytics : Allows to’analyze traffic on the website{' '}
                <LinkText>https://assurance-genevoise.ch/</LinkText>
              </ListItem>
              <ListItem>
                Google Tag Manager: Tag Manager that allows marketing managers
                to’ easily add tags (Analytics, remarketing, etc.) to their
                website.
              </ListItem>
            </List>
          </Paragraph>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="lg:text-2xl text-xl font-bold !leading-[130%]">
            Your right
          </h2>
          <Paragraph>
            We are obliged to process specific, relevant and necessary personal
            data while taking into account our legitimate purposes. You have the
            right to control this right.
          </Paragraph>
          <Paragraph>
            To update the personal data that we process about you, please
            contact us at<LinkText> contact@assurance-genevoise.ch</LinkText>
          </Paragraph>
          <Paragraph>
            To receive a free extract of personal data that we process about
            you, you can send us a registered letter to the following
            address: AG Assurance Genevoise SA, Rue des Alpes 5, 1201 Geneva,
            Switzerland.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
