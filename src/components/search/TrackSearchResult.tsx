import { Track } from '@spotify/web-api-ts-sdk';
import { SkeletonItem } from '../skeletons/SkeletonItem';
import { TrackList, TrackListSkeleton } from '../TrackList';
import { TopTrackSearchResult, TopTrackSearchResultSkeleton } from './TopTrackSearchResult';
import {
    TopTrackSearchResultList,
    TopTrackSearchResultListSkeleton,
} from './TopTrackSearchResultList';

export interface TrackSearchResultProps {
    tracks: Track[];
    displayMode: 'all' | 'top-items';
    searchText: string;
}

export const TrackSearchResult = ({ tracks, displayMode, searchText }: TrackSearchResultProps) => {
    if (displayMode === 'top-items') {
        const [top, ...rest] = tracks.slice(0, 5);
        return (
            <div className="flex gap-4 p-4">
                <div className="w-2/5">
                    <TopTrackSearchResult track={top} />
                </div>
                <div className="flex-1">
                    <h2 className="mb-2 text-xl font-semibold">Songs</h2>
                    <TopTrackSearchResultList tracks={rest} />
                </div>
            </div>
        );
    }

    return <TrackList tracks={tracks} entityId={searchText} type="trackRecommendations" />;
};

export const TrackSearchResultSkeleton = ({
    displayMode,
}: {
    displayMode: 'all' | 'top-items';
}) => {
    if (displayMode === 'top-items') {
        return (
            <div className="flex gap-4 p-4">
                <div className="w-2/5">
                    <SkeletonItem className="mb-2 h-7 w-20" />
                    <TopTrackSearchResultSkeleton />
                </div>
                <div className="flex-1">
                    <SkeletonItem className="mb-2 h-7 w-20" />
                    <TopTrackSearchResultListSkeleton />
                </div>
            </div>
        );
    }

    return <TrackListSkeleton type="trackRecommendations" />;
};
