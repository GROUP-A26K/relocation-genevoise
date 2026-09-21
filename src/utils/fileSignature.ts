type TDocumentSignature = {
  extension: 'pdf' | 'docx' | 'doc';
  mimeType: string;
  bytes: readonly number[];
};

const DOCUMENT_SIGNATURES: readonly TDocumentSignature[] = [
  {
    extension: 'pdf',
    mimeType: 'application/pdf',
    bytes: [0x25, 0x50, 0x44, 0x46, 0x2d],
  },
  {
    extension: 'docx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    bytes: [0x50, 0x4b, 0x03, 0x04],
  },
  {
    extension: 'doc',
    mimeType: 'application/msword',
    bytes: [0xd0, 0xcf, 0x11, 0xe0],
  },
];

export function detectDocumentType(
  buffer: Uint8Array
): TDocumentSignature | null {
  return (
    DOCUMENT_SIGNATURES.find((signature) =>
      signature.bytes.every((byte, index) => buffer[index] === byte)
    ) ?? null
  );
}
