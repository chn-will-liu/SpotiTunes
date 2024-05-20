import { BsDownload, BsRepeat } from 'react-icons/bs';
import { FaPause } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';
import { LuShuffle } from 'react-icons/lu';
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from 'react-icons/tb';
import { IconButton } from './IconButton';
import { ProgressBar } from './ProgressBar';

export const Player = () => {
    return (
        <div className="box-content flex p-8">
            <div className="aspect-square h-full rounded-md bg-white"></div>
            <div className="ml-12 mr-5 flex-1">
                <div className="mb-6 flex items-center gap-6">
                    <IconButton icon={GrFavorite} size="xl" hoverEffect="opacity" />
                    <IconButton
                        icon={BsDownload}
                        size="xl"
                        hoverEffect="opacity"
                        className="mr-auto"
                    />
                    <IconButton icon={TbPlayerSkipBackFilled} size="xl" hoverEffect="opacity" />
                    <PlayButton />
                    <IconButton icon={TbPlayerSkipForwardFilled} size="xl" hoverEffect="opacity" />

                    <IconButton
                        icon={LuShuffle}
                        size="xl"
                        hoverEffect="opacity"
                        className="ml-auto"
                    />
                    <IconButton icon={BsRepeat} size="xl" hoverEffect="opacity" />
                </div>
                <Timeline />
            </div>
        </div>
    );
};

const PlayButton = () => {
    return (
        <button
            className="flex size-[66px] transform items-center justify-center rounded-full
         bg-white bg-gradient-to-br from-white via-white to-gray-400 transition-transform active:scale-[.95]"
        >
            <FaPause className="size-8 text-black" />
        </button>
    );
};

const Timeline = () => {
    return (
        <div className="flex items-center gap-4">
            <span className="text-sm text-white text-opacity-65">0:00</span>
            <div className="flex-1">
                <ProgressBar />
            </div>
            <span className="text-sm text-white text-opacity-65">0:00</span>
        </div>
    );
};
