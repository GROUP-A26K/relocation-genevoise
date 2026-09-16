import { post } from '@/libs/axios';

import type {
  ContactSubmitResponse,
  ContactSubmitVariables,
} from './contact.types';

export function submitContactApi({ values, locale }: ContactSubmitVariables) {
  return post<ContactSubmitResponse>(
    '/api/contact',
    {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      accept: values.accept,
      phone: values.phone,
      company: values.company,
    },
    { locale }
  );
}
