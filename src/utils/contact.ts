export const getTelHref = (telephone: string) =>
  `tel:${telephone.replace(/[^\d+]/g, '')}`;

export const getMailToHref = (email: string) => `mailto:${email.trim()}`;
