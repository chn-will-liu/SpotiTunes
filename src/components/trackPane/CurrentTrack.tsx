import { Link } from 'react-router-dom';
import discImg from '../../assets/disc.png';
import stylus from '../../assets/stylus.png';
import { usePlayerState } from '../../hooks/usePlayer';
import { ArtistLinkList } from '../artist/ArtistLinkList';

export const CurrentTrack = () => {
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
