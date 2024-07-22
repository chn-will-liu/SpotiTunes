import { TbPlaylist } from 'react-icons/tb';
import { IconButton } from '../IconButton';
import { CurrentTrack } from './CurrentTrack';
import { MuteButton } from './MuteButton';
import { VolumeBar } from './VolumeBar';

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
