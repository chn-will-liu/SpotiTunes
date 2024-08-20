import { Track } from '@spotify/web-api-ts-sdk';
import { TrackListItem, TrackListItemSkeleton } from '../TrackListItem';

export const TopTrackSearchResultListSkeleton = () => {
    return (
        <>
            <TrackListItemSkeleton compactMode showAlbum />
            <TrackListItemSkeleton compactMode showAlbum />
            <TrackListItemSkeleton compactMode showAlbum />
            <TrackListItemSkeleton compactMode showAlbum />
        </>
    );
};

export const TopTrackSearchResultList = ({ tracks }: { tracks: Track[] }) => {
    return (
        <ul>
            {tracks.map((track) => (
                <TrackListItem
                    key={track.id}
                    track={track}
                    album={track.album}
                    showAlbum
                    compactMode
                />
            ))}
        </ul>
    );
};
