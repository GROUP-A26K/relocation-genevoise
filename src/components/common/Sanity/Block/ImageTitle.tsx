import Image from 'next/image';
import { Link } from 'lucide-react';

interface IImageTitleProps {
  imgUrl?: string;
  imgLqip?: string;
  title: string;
}
export const ImageTitle: React.FC<IImageTitleProps> = ({
  imgUrl,
  imgLqip,
  title,
}) => {
  return (
    <article className="relative flex flex-col items-start justify-between gap-4 py-6">
      <div className="w-full">
        <Image
          alt={title}
          title={title}
          src={
            imgUrl ??
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80'
          }
          placeholder={imgLqip ? 'blur' : 'empty'}
          blurDataURL={imgLqip}
          width={720}
          height={480}
          className="aspect-video w-full max-w-[720px] rounded-2xl bg-gray-100 object-cover lg:h-[480px] lg:max-h-[480px]"
        />
      </div>
      <div className="flex items-center gap-2 text-xs leading-[130%]! font-medium text-gray-500">
        <Link className="h-4 w-4" />
        {title}
      </div>
    </article>
  );
};
