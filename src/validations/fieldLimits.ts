export const FIELD_LIMITS = {
  email: 254,
  phone: 16,
  company: 150,
  subject: 150,
  message: 5000,
  experienceYears: 100,
  expectedCtc: 20,
  department: 150,
  position: 150,
  propertyAddress: 255,
  propertyType: 50,
  numberOfRooms: 20,
  additionalInfo: 1000,
} as const;

type TMaxLengthTranslator = (
  key: 'maxLength',
  values: { max: number }
) => string;

export const maxLengthMessage = (
  t: TMaxLengthTranslator | undefined,
  max: number
) => ({
  message:
    t?.('maxLength', { max }) ??
    `This field can have a maximum of ${max} characters.`,
});
