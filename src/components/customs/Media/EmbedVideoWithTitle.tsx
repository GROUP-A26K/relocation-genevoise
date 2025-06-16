'use client';
interface Props {
  title?: string;
  videoUrl?: string;
}
export const EmbedVideoWithTitle: React.FC<Props> = ({ videoUrl, title }) => {
  if (!videoUrl) return null;
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-4 py-6 w-full">
        <iframe
          className="w-full rounded-2xl"
          style={{
            aspectRatio: '16/9',
          }}
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        <div className="flex gap-2 text-gray-500 text-xs !leading-[130%] font-medium items-center">
          {title}
        </div>
      </div>
    </div>
  );
};
