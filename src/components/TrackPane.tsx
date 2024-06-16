import { useEffect, useRef, useState } from 'react';
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from 'react-icons/bi';
import { TbPlaylist } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import discImg from '../assets/disc.png';
import stylus from '../assets/stylus.png';
import { usePlayer, usePlayerState } from '../hooks/usePlayer';
import { ArtistLinkList } from './ArtistLinkList';
import { IconButton } from './IconButton';
import { ProgressBar } from './ProgressBar';

export const TrackPane = () => {
    return (
        <div className="mt-auto px-6 pb-9">
            <hr className="mt-2 border-white border-opacity-25" />
            <CurrentTrack />
            <div className="flex items-center gap-4">
                <MuteButton />
                <VolumeBar />
                <IconButton icon={TbPlaylist} size="lg" />
            </div>
        </div>
    );
};

const VolumeBar = () => {
    const player = usePlayer();
    const volume = usePlayerState((state) => state.volume);

    return (
        <ProgressBar
            progress={volume}
            onChange={(value) => {
                player.setVolume(value);
            }}
        />
    );
};

const MuteButton = () => {
    const [isMuted, setIsMuted] = useState(false);
    const player = usePlayer();
    const originalVolume = useRef(1);
    const currentVolume = usePlayerState((state) => state.volume);
    const volumeIcon = isMuted ? BiVolumeMute : currentVolume > 0.5 ? BiVolumeFull : BiVolumeLow;

    useEffect(() => {
        if (currentVolume > 0) {
            setIsMuted(false);
            originalVolume.current = currentVolume;
        } else {
            setIsMuted(true);
        }
    }, [currentVolume]);

    return (
        <IconButton
            icon={volumeIcon}
            size="lg"
            onClick={() => {
                if (isMuted) {
                    player.setVolume(originalVolume.current);
                } else {
                    player.setVolume(0);
                }
                setIsMuted((m) => !m);
            }}
        />
    );
};

const CurrentTrack = () => {
    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);
    const isPlaying = usePlayerState((state) => !state.paused);

    return (
        <div className={`group flex items-center gap-2 py-7 ${isPlaying ? 'playing' : 'paused'}`}>
            <div className="pointer-events-none relative my-3 flex-shrink-0 select-none pr-3">
                <img
                    src={discImg}
                    alt="Disc"
                    className="size-16 animate-spin-slow [animation-play-state:paused] group-[.playing]:[animation-play-state:running]"
                />
                <img
                    src={stylus}
                    alt="Stylus"
                    className="absolute right-0 top-[14px] w-[28px] origin-top-right rotate-[-16deg] transform transition-transform duration-300 ease-in-out group-[.playing]:rotate-0"
                />
            </div>
            <div>
                <div className="line-clamp-2 text-lg">
                    {currentTrack ? (
                        <Link to={`/track/${currentTrack.id}`} className="hover:underline">
                            {currentTrack.name}
                        </Link>
                    ) : (
                        ''
                    )}
                </div>
                <div className="line-clamp-2 text-sm font-light">
                    <ArtistLinkList artists={currentTrack?.artists ?? []} />
                </div>
            </div>
        </div>
    );
};
