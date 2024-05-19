import { BiVolumeFull } from 'react-icons/bi';
import { TbPlaylist } from 'react-icons/tb';
import { IconButton } from './IconButton';
import { ProgressBar } from './ProgressBar';

export const TrackPane = () => {
    return (
        <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
                <div className="size-[90px] bg-white">disc</div>
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
