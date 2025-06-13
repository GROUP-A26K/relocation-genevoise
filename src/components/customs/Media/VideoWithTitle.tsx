'use client';
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
import { cn } from '@/libs/utils';

interface Props {
  title?: string;
  videoUrl?: string;
}
export const VideoWithTitle: React.FC<Props> = ({ videoUrl, title }) => {
  if (!videoUrl) return null;
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-4 py-6 overflow-y-scroll w-full">
        <VideoPlayer className="relative overflow-hidden rounded-2xl border w-full">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.31)_31%,rgba(0,0,0,.7)_70%,rgba(0,0,0,.7)_100%)]" />

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
          <VideoPlayerControlBar
            className={cn(
              'relative z-20',
              'lg:[--media-control-padding:3.75px] [--media-control-padding:2.25px]'
            )}
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex w-full items-center justify-between lg:h-10 h-8">
                <div className="flex lg:h-10 h-8">
                  <VideoPlayerPlayButton
                    className={cn(
                      'lg:size-10 size-8 text-white bg-transparent',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                  <VideoPlayerTimeDisplay
                    showDuration
                    className="text-white bg-transparent px-2"
                  />
                </div>

                <div className="flex lg:h-10 h-8">
                  <VideoPlayerMuteButton
                    className={cn(
                      'lg:size-10 size-8 text-white text-sm font-normal !leading-[130%] bg-transparent pr-0',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                  <VideoPlayerVolumeRange
                    className={cn(
                      'text-white bg-transparent px-0 w-14 max-w-14 mx-0 lg:h-10 h-8',
                      '[--media-range-bar-color:#FFFFFF]',
                      '[--media-range-track-background:#94a3b8]',
                      '[--media-range-thumb-background:#FFFFFF]',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                  <VideoPlayerFullscreenButton
                    className={cn(
                      'text-white bg-transparent lg:size-10 size-8',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                </div>
              </div>
              <VideoPlayerTimeRange
                className={cn(
                  'bg-transparent w-full h-fit py-0 pb-4 text-white',
                  '[--media-range-bar-color:#F7D913]',
                  '[--media-range-track-background:#94a3b8]',
                  '[--media-range-thumb-background:transparent]'
                )}
              />
            </div>
          </VideoPlayerControlBar>
        </VideoPlayer>
        <div className="flex gap-2 text-gray-500 text-xs !leading-[130%] font-medium items-center">
          {title}
        </div>
      </div>
    </div>
  );
};
