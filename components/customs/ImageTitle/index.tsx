import { type FC } from 'react';
import Image from 'next/image';
import { Link } from 'lucide-react';
interface Props {
  imgUrl?: string;
  title: string;
}
export const ImageTitle: FC<Props> = ({ imgUrl, title }) => {
  return (
    <article className="flex flex-col relative items-start justify-between gap-4 py-6">
      <div className="w-full">
        <Image
          alt={title}
          title={title}
          src={
            imgUrl ??
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80'
          }
          width={720}
          height={480}
          className="aspect-video lg:h-[480px] lg:max-h-[480px] max-w-[720px] rounded-2xl w-full bg-gray-100 object-cover"
        />
      </div>
      <div className="flex gap-2 text-gray-500 text-xs !leading-[130%] font-medium items-center">
        <Link className="h-4 w-4" />
        {title}
      </div>
    </article>
  );
};
