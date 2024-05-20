import { BiVolumeFull } from 'react-icons/bi';
import { TbPlaylist } from 'react-icons/tb';
import discImg from '../assets/disc.png';
import stylus from '../assets/stylus.png';
import { IconButton } from './IconButton';
import { ProgressBar } from './ProgressBar';

export const TrackPane = () => {
    return (
        <div className="mt-auto px-6 pb-9">
            <hr className="mt-5 border-white border-opacity-25" />
            <div className="group flex items-center gap-2 py-7">
                <div className="pointer-events-none relative select-none pr-3">
                    <img
                        src={discImg}
                        alt="Disc"
                        className="group-hover:animate-spin-slow size-16"
                    />
                    <img
                        src={stylus}
                        alt="Stylus"
                        className="absolute right-0 top-[14px] w-[28px] origin-top-right rotate-[-16deg] transform transition-transform duration-300 ease-in-out group-hover:rotate-0"
                    />
                </div>
                <div>
                    <div className="text-lg">Take on ME</div>
                    <div className="text-sm font-light">A-ha</div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <IconButton icon={BiVolumeFull} size="xl" />
                <ProgressBar />
                <IconButton icon={TbPlaylist} size="xl" />
            </div>
        </div>
    );
};
