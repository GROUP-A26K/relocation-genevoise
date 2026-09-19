'use client';
import BodyText from '@/components/common/Text/BodyText';

interface IEmbedVideoWithTitleProps {
  title?: string;
  videoUrl?: string;
}
export const EmbedVideoWithTitle: React.FC<IEmbedVideoWithTitleProps> = ({
  videoUrl,
  title,
}) => {
  if (!videoUrl) return null;
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start justify-between gap-4 py-6">
        <iframe
          className="w-full rounded-2xl"
          style={{
            aspectRatio: '16/9',
          }}
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        <BodyText
          variant="xs"
          asChild
          className="flex items-center gap-2 font-medium text-gray-500"
        >
          <div>{title}</div>
        </BodyText>
      </div>
    </div>
  );
};
