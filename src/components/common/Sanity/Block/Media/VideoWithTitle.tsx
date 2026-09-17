'use client';
import BodyText from '@/components/common/Text/BodyText';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerFullscreenButton,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/ui/kibo-ui/video-player';

interface IVideoWithTitleProps {
  title?: string;
  videoUrl?: string;
}
export const VideoWithTitle: React.FC<IVideoWithTitleProps> = ({
  videoUrl,
  title,
}) => {
  if (!videoUrl) return null;
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start justify-between gap-4 py-6">
        <VideoPlayer className="relative w-full overflow-hidden rounded-2xl border">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.31)_31%,rgba(0,0,0,.7)_70%,rgba(0,0,0,.7)_100%)]" />

          <VideoPlayerContent
            slot="media"
            src={
              videoUrl ??
              'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4'
            }
            preload="auto"
            muted
            crossOrigin=""
            className="w-full"
          />
          <VideoPlayerControlBar className="relative z-20 [--media-control-padding:2.25px] lg:[--media-control-padding:3.75px]">
            <div className="flex w-full flex-col items-center">
              <div className="flex h-8 w-full items-center justify-between lg:h-10">
                <div className="flex h-8 lg:h-10">
                  <VideoPlayerPlayButton className="size-8 bg-transparent text-white [--media-icon-color:#FFFFFF] lg:size-10" />
                  <VideoPlayerTimeDisplay
                    showDuration
                    className="bg-transparent px-2 text-white"
                  />
                </div>

                <div className="flex h-8 lg:h-10">
                  <VideoPlayerMuteButton className="size-8 bg-transparent pr-0 text-sm leading-[130%] font-normal text-white [--media-icon-color:#FFFFFF] lg:size-10" />
                  <VideoPlayerVolumeRange className="mx-0 h-8 w-14 max-w-14 bg-transparent px-0 text-white [--media-icon-color:#FFFFFF] [--media-range-bar-color:#FFFFFF] [--media-range-thumb-background:#FFFFFF] [--media-range-track-background:#94a3b8] lg:h-10" />
                  <VideoPlayerFullscreenButton className="size-8 bg-transparent text-white [--media-icon-color:#FFFFFF] lg:size-10" />
                </div>
              </div>
              <VideoPlayerTimeRange className="h-fit w-full bg-transparent py-0 pb-4 text-white [--media-range-bar-color:#F7D913] [--media-range-thumb-background:transparent] [--media-range-track-background:#94a3b8]" />
            </div>
          </VideoPlayerControlBar>
        </VideoPlayer>
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
