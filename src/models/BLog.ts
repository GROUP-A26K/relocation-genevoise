export interface Blog {
  id: string;
  title: string;
  href: string;
  slug: string;
  description: string;
  timeToRead: number;
  publishedDate: string;
  imageUrl: string;
  date: string;
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
  | object;

export type WysiwygBlock = {
  _type: 'wysiwygBlock';
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
          asset?: SanityImageAsset;
          hotspot?: SanityImageHotspot;
          crop?: SanityImageCrop;
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
    };

export type SanityImageAsset = {
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
};

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot';
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: 'sanity.imageCrop';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type StatsBlock = {
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
