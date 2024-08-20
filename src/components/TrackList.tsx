import { usePlayerState } from '../hooks/usePlayer';
import { useTrackListPlay } from '../hooks/useTrackListPlay';
import { TrackListModel } from '../models/TrackListModel';
import { TrackListItem, TrackListItemSkeleton } from './TrackListItem';

export const TrackList = (trackList: TrackListModel) => {
    const { isTrackListInPlayer, toggleTrackListPlay } = useTrackListPlay(trackList);

    const currentPlayTrack = usePlayerState((state) => state.trackWindow.currentTrack);

    return (
        <div className="ml-4">
            {trackList.tracks.map((track, index) => (
                <TrackListItem
                    key={track.id}
                    showIndex
                    index={index}
                    track={track}
                    album={track.album}
                    isInPlayer={isTrackListInPlayer && track.id === currentPlayTrack?.id}
                    showAlbum={trackList.type !== 'album'}
                    showAlbumName={trackList.type === 'album'}
                    onPlayButtonClick={() => toggleTrackListPlay(index)}
                />
            ))}
        </div>
    );
};

export const TrackListSkeleton = ({ type }: { type: TrackListModel['type'] }) => {
    return (
        <div className="ml-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <TrackListItemSkeleton key={index} showAlbum={type !== 'album'} showIndex />
            ))}
        </div>
    );
};
