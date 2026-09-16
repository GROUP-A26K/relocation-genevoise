export type TBlock =
  | ({
      _key: string;
    } & TWysiwygBlock)
  | ({
      _key: string;
    } & TStatsBlock)
  | ({
      _key: string;
    } & TFaqBlock)
  | ({
      _key: string;
    } & TCtaBlock)
  | object;

export type TWysiwygBlock = {
  _type: 'wysiwygBlock';
  blockTitle?: {
    title?: string;
    isStyle?: boolean;
    content?: TContent[];
  };
};

export type TContent =
  | {
      children?: Array<{
        marks?: string[];
        text?: string;
        _type: 'span';
        _key: string;
      }>;
      style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
      listItem?: 'bullet' | 'number';
      markDefs?: Array<{
        href?: string;
        _type: 'link';
        _key: string;
      }>;
      level?: number;
      _type: 'block';
      _key: string;
    }
  | {
      mainPhoto?: {
        imageTitle?: string;
        photo?: {
          asset?: TSanityImageAsset;
          hotspot?: TSanityImageHotspot;
          crop?: TSanityImageCrop;
          _type: 'image';
        };
        photoAlt?: string;
      };
      _type: 'photoZone';
      _key: string;
    }
  | {
      content?: string;
      author?: string;
      _type: 'quote';
      _key: string;
    }
  | {
      tableTitle?: string;
      tableData?: TTable;
      _type: 'tableZone';
      _key: string;
    }
  | {
      title?: string;
      _type: 'videoZone';
      source?: 'file' | 'url' | 'embed';
      videoFile?: {
        asset?: TSanityFileAsset;
        _type: 'file';
      };
      videoUrl?: string;
      embedUrl?: string;
      _key: string;
    }
  | {
      photo?: {
        asset: TSanityImageAsset;
        hotspot?: TSanityImageHotspot;
        crop?: TSanityImageCrop;
        _type: 'image';
      };
      author?: string;
      authorInfo?: string;
      content?: string;
      _type: 'quoteImageZone';
      _key: string;
    }
  | {
      sectionType?: 'goodToKnow' | 'information' | 'error';
      sectionTitle?: string;
      sectionContent?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: 'span';
          _key: string;
        }>;
        style?:
          'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
        listItem?: 'bullet' | 'number';
        markDefs?: Array<{
          href?: string;
          _type: 'link';
          _key: string;
        }>;
        level?: number;
        _type: 'block';
        _key: string;
      }>;
      _type: 'newSectionZone';
      _key: string;
    };

export type TTable = {
  _type: 'table';
  rows?: Array<{
    _key: string;
    cells?: Array<string>;
  }>;
};
export type TSanityImageAsset = {
  _id: string;
  _type: 'sanity.imageAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  lqip?: string;
};
export type TSanityFileAsset = {
  _id: string;
  _type: 'sanity.fileAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
};
export type TSanityImageHotspot = {
  _type: 'sanity.imageHotspot';
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type TSanityImageCrop = {
  _type: 'sanity.imageCrop';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type TStatsBlock = {
  _type: 'statsBlock';
  firstStat?: {
    value?: string;
    label?: string;
  };
  secondStat?: {
    value?: string;
    label?: string;
  };
  thirdStat?: {
    value?: string;
    label?: string;
  };
};

export type TFaqBlock = {
  _type: 'faqBlock';
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export type TCtaBlock = {
  _type: 'ctaBlock';
  blockTitle?: {
    title?: string;
    buttonText?: string;
    description?: string;
  };
};

export const BODY_BLOCKS = {
  WYSIWYG_BLOCK: 'wysiwygBlock',
  STATS_BLOCK: 'statsBlock',
  FAQ_BLOCK: 'faqBlock',
  CTA_BLOCK: 'ctaBlock',
} as const;
export type TBlogBodyBlocks = (typeof BODY_BLOCKS)[keyof typeof BODY_BLOCKS];
