import { useMemo, useState } from 'react';
import { BsDownload, BsRepeat } from 'react-icons/bs';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';
import { LuShuffle } from 'react-icons/lu';
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from 'react-icons/tb';
import { usePlayer, usePlayerState } from '../hooks/usePlayer';
import { formatDuration } from '../utils';
import { AlbumImage } from './AlbumImage';
import { IconButton } from './IconButton';
import { ProgressBar } from './ProgressBar';

export const Player = () => {
    return (
        <div className="box-content flex gap-8 py-8 pl-8 pr-14">
            <AlbumOfCurrentTrack />
            <div className="flex-1">
                <div className="mb-6 flex items-center gap-6">
                    <IconButton icon={GrFavorite} size="xl" hoverEffect="opacity" />
                    <IconButton
                        icon={BsDownload}
                        size="xl"
                        hoverEffect="opacity"
                        className="mr-auto"
                    />

                    <PlayControl />

                    <IconButton
                        icon={LuShuffle}
                        size="xl"
                        hoverEffect="opacity"
                        className="ml-auto"
                    />
                    <IconButton icon={BsRepeat} size="xl" hoverEffect="opacity" />
                </div>
                <TimelineBar />
            </div>
        </div>
    );
};

const PlayControl = () => {
    const player = usePlayer();
    return (
        <>
            <IconButton
                icon={TbPlayerSkipBackFilled}
                size="xl"
                hoverEffect="opacity"
                onClick={() => player.skipToPrevious()}
            />
            <PlayButton />
            <IconButton
                icon={TbPlayerSkipForwardFilled}
                size="xl"
                hoverEffect="opacity"
                onClick={() => player.skipToNext()}
            />
        </>
    );
};

const PlayButton = () => {
    const isPaused = usePlayerState((state) => state.paused);

    const player = usePlayer();

    return (
        <button
            className="flex size-[66px] transform items-center justify-center rounded-full
         bg-white bg-gradient-to-br from-white via-white to-gray-400 transition-transform active:scale-[.95]"
            onClick={() => player.togglePlay()}
        >
            {isPaused ? (
                <FaPlay className="ml-1 size-8 text-black" />
            ) : (
                <FaPause className="size-8 text-black" />
            )}
        </button>
    );
};

const TimelineBar = () => {
    const player = usePlayer();
    const position = usePlayerState((state) => state.position);
    const totalDuration = usePlayerState((state) => state.totalDuration);

    const [draggingPosition, setDraggingPosition] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const totalDurationStr = useMemo(() => formatDuration(totalDuration), [totalDuration]);
    const currentPosition = draggingPosition ?? position;
    const currentTime = formatDuration(currentPosition * totalDuration);

    return (
        <div className="flex items-center gap-2">
            <div className="w-8 text-right font-mono text-sm text-white text-opacity-65">
                {currentTime}
            </div>
            <div className="flex-1">
                <ProgressBar
                    progress={currentPosition}
                    onChange={(position) => {
                        if (!isDragging) {
                            player.seek(position);
                        } else {
                            setDraggingPosition(position);
                        }
                    }}
                    isDraggingChange={(value) => {
                        setIsDragging(value);
                        if (!value) {
                            player.seek(draggingPosition ?? position);
                            setDraggingPosition(null);
                        }
                    }}
                />
            </div>
            <div className="w-8 text-left font-mono text-sm text-white text-opacity-65">
                {totalDurationStr}
            </div>
        </div>
    );
};

const AlbumOfCurrentTrack = () => {
    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);

    return (
        <AlbumImage
            images={currentTrack?.album.images ?? []}
            alt={currentTrack?.album.name ?? ''}
            size={114}
        />
    );
};
