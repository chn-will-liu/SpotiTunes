import { BsDownload } from 'react-icons/bs';
import { LuShuffle } from 'react-icons/lu';
import { IconButton } from '../IconButton';
import { AlbumOfCurrentTrack } from './AlbumOfCurrentTrack';
import { LikeButton, RepeatButton } from './Buttons';
import { PlayControl } from './PlayControl';
import { TimelineBar } from './TimelineBar';

export const Player = () => {
    return (
        <div className="box-content flex gap-8 py-8 pl-8 pr-14">
            <AlbumOfCurrentTrack />
            <div className="flex-1">
                <div className="mb-6 flex items-center gap-6">
                    <LikeButton />
                    <IconButton
                        icon={BsDownload}
                        size="lg"
                        hoverEffect="opacity"
                        className="mr-auto"
                    />

                    <PlayControl />

                    <IconButton
                        icon={LuShuffle}
                        size="lg"
                        hoverEffect="opacity"
                        className="ml-auto"
                    />
                    <RepeatButton />
                </div>
                <TimelineBar />
            </div>
        </div>
    );
};
