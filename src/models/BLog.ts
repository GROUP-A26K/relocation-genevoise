export interface Blog {
  id: string;
  title: string;
  href: string;
  slug: string;
  description: string;
  timeToRead: number;
  publishedDate: string;
  imageUrl: string;
  time: string;
  category: {
    title: string;
    href: string;
  }[];
  author: {
    name: string;
    role: string;
    href: string;
    email: string;
    imageUrl: string;
  };
}

export interface BlogSitemap {
  id: string;
  title: string;
  href: string;
  slug: string;
}

export interface BlogDetail extends Blog {
  body: Block[];
}

export type Block =
  | ({
      _key: string;
    } & WysiwygBlock)
  | ({
      _key: string;
    } & StatsBlock)
  | ({
      _key: string;
    } & FaqBlock)
  | ({
      _key: string;
    } & CtaBlock)
  | object;

export type WysiwygBlock = {
  _type: "wysiwygBlock";
  blockTitle?: {
    title?: string;
    isStyle?: boolean;
    content?: Content[];
  };
};

export type Content =
  | {
      children?: Array<{
        marks?: string[];
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }
  | {
      mainPhoto?: {
        imageTitle?: string;
        photo?: {
          asset?: SanityImageAsset;
          hotspot?: SanityImageHotspot;
          crop?: SanityImageCrop;
          _type: "image";
        };
        photoAlt?: string;
      };
      _type: "photoZone";
      _key: string;
    }
  | {
      content?: string;
      author?: string;
      _type: "quote";
      _key: string;
    }
  | {
      tableTitle?: string;
      tableData?: Table;
      _type: "tableZone";
      _key: string;
    }
  | {
      title?: string;
      _type: "videoZone";
      source?: "file" | "url" | "embed";
      videoFile?: {
        asset?: SanityFileAsset;
        _type: "file";
      };
      videoUrl?: string;
      embedUrl?: string;
      _key: string;
    }
  | {
      photo?: {
        asset: SanityImageAsset;
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
      author?: string;
      authorInfo?: string;
      content?: string;
      _type: "quoteImageZone";
      _key: string;
    }
  | {
      sectionType?: "goodToKnow" | "information" | "error";
      sectionTitle?: string;
      sectionContent?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?:
          | "normal"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
      _type: "newSectionZone";
      _key: string;
    };

export type Table = {
  _type: "table";
  rows?: Array<{
    _key: string;
    cells?: Array<string>;
  }>;
};
export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
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
export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
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
export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type StatsBlock = {
  _type: "statsBlock";
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

export type FaqBlock = {
  _type: "faqBlock";
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export type CtaBlock = {
  _type: "ctaBlock";
  blockTitle?: {
    title?: string;
    buttonText?: string;
    description?: string;
  };
};

export const BLOG_BODY_BLOCKS = {
  WYSIWYG_BLOCK: "wysiwygBlock",
  STATS_BLOCK: "statsBlock",
  FAQ_BLOCK: "faqBlock",
  CTA_BLOCK: "ctaBlock",
} as const;
export type BlogBodyBlocks =
  (typeof BLOG_BODY_BLOCKS)[keyof typeof BLOG_BODY_BLOCKS];
