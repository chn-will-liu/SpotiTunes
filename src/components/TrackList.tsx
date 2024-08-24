import { useMemo } from 'react';
import { usePlayerState } from '../hooks/usePlayer';
import { useTrackListPlay } from '../hooks/useTrackListPlay';
import { TrackListModel } from '../models/TrackListModel';
import { TrackListItem, TrackListItemSkeleton } from './TrackListItem';

export const TrackList = ({ contextUri, tracks }: TrackListModel) => {
    const { isTrackListInPlayer, toggleTrackListPlay } = useTrackListPlay({ contextUri, tracks });
    const currentPlayTrack = usePlayerState((state) => state.trackWindow.currentTrack);
    const isAlbumTracks = useMemo(() => contextUri?.startsWith('spotify:album'), [contextUri]);

    return (
        <div className="ml-4">
            {tracks.map((track, index) => (
                <TrackListItem
                    key={track.id}
                    showIndex
                    index={index}
                    track={track}
                    album={track.album}
                    isInPlayer={isTrackListInPlayer && track.id === currentPlayTrack?.id}
                    showAlbum={isAlbumTracks}
                    showAlbumName={isAlbumTracks}
                    onPlayButtonClick={() => toggleTrackListPlay(index)}
                />
            ))}
        </div>
    );
};

export const TrackListSkeleton = ({ contextUri }: { contextUri?: string }) => {
    return (
        <div className="ml-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <TrackListItemSkeleton
                    key={index}
                    showAlbum={contextUri?.startsWith('spotify:album')}
                    showIndex
                />
            ))}
        </div>
    );
};
