import { BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { useIsTrackLiked } from '../../hooks/useIsTrackLiked';
import { usePlayer, usePlayerState } from '../../hooks/usePlayer';
import { RepeatMode } from '../../spotify/webPlayer/types';
import { IconButton } from '../IconButton';

export const LikeButton = () => {
    const currentTrack = usePlayerState((state) => state.trackWindow.currentTrack);
    const isCurrentTrackLiked = useIsTrackLiked(currentTrack?.id);

    return (
        <IconButton
            icon={isCurrentTrackLiked ? PiHeartFill : PiHeart}
            size="lg"
            hoverEffect="scale"
            className={isCurrentTrackLiked ? 'text-spotiGreen' : 'text-white'}
        />
    );
};

export const PlayButton = () => {
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

export const RepeatButton = () => {
    const repeatMode = usePlayerState((state) => state.repeatMode);
    const player = usePlayer();

    const color = repeatMode === RepeatMode.None ? 'text-white text-opacity-65' : 'text-spotiGreen';
    const icon = repeatMode === RepeatMode.Track ? BsRepeat1 : BsRepeat;
    const onClick = () => {
        if (repeatMode === RepeatMode.None) {
            player.setRepeatMode(RepeatMode.Context);
        } else if (repeatMode === RepeatMode.Context) {
            player.setRepeatMode(RepeatMode.Track);
        } else {
            player.setRepeatMode(RepeatMode.None);
        }
    };
    return (
        <IconButton icon={icon} size="lg" hoverEffect="scale" className={color} onClick={onClick} />
    );
};
