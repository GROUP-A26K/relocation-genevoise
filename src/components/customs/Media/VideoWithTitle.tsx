'use client';
import { cn } from '@/libs/utils';
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

interface Props {
  title?: string;
  videoUrl?: string;
}
export const VideoWithTitle: React.FC<Props> = ({ videoUrl, title }) => {
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
          <VideoPlayerControlBar
            className={cn(
              'relative z-20',
              '[--media-control-padding:2.25px] lg:[--media-control-padding:3.75px]'
            )}
          >
            <div className="flex w-full flex-col items-center">
              <div className="flex h-8 w-full items-center justify-between lg:h-10">
                <div className="flex h-8 lg:h-10">
                  <VideoPlayerPlayButton
                    className={cn(
                      'size-8 bg-transparent text-white lg:size-10',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                  <VideoPlayerTimeDisplay
                    showDuration
                    className="bg-transparent px-2 text-white"
                  />
                </div>

                <div className="flex h-8 lg:h-10">
                  <VideoPlayerMuteButton
                    className={cn(
                      'size-8 bg-transparent pr-0 text-sm leading-[130%]! font-normal text-white lg:size-10',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                  <VideoPlayerVolumeRange
                    className={cn(
                      'mx-0 h-8 w-14 max-w-14 bg-transparent px-0 text-white lg:h-10',
                      '[--media-range-bar-color:#FFFFFF]',
                      '[--media-range-track-background:#94a3b8]',
                      '[--media-range-thumb-background:#FFFFFF]',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                  <VideoPlayerFullscreenButton
                    className={cn(
                      'size-8 bg-transparent text-white lg:size-10',
                      '[--media-icon-color:#FFFFFF]'
                    )}
                  />
                </div>
              </div>
              <VideoPlayerTimeRange
                className={cn(
                  'h-fit w-full bg-transparent py-0 pb-4 text-white',
                  '[--media-range-bar-color:#F7D913]',
                  '[--media-range-track-background:#94a3b8]',
                  '[--media-range-thumb-background:transparent]'
                )}
              />
            </div>
          </VideoPlayerControlBar>
        </VideoPlayer>
        <div className="flex items-center gap-2 text-xs leading-[130%]! font-medium text-gray-500">
          {title}
        </div>
      </div>
    </div>
  );
};
