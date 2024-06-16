import { SimplifiedAlbum, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { usePlayer, usePlayerState } from '../hooks/usePlayer';
import { useTrackListPlay } from '../hooks/useTrackListPlay';
import { TrackListModel } from '../models/TrackListModel';
import { PlaybackTrackListType } from '../spotify/webPlayer/types';
import { SpotiGreenButton } from './SpotiGreenButton';

export type TrackListPlayButtonProps = PlaybackTrackListType & {
    tracks: SimplifiedTrack[];
    album: SimplifiedAlbum;
};

export const TrackListPlayButton = (trackList: TrackListModel) => {
    const trackListType = usePlayerState((state) => state.trackWindow.trackListType);
    const isPaused = usePlayerState((state) => state.paused);
    const isCurrentTrackListInPlayer = isTrackListTypeEqual(trackListType, trackList);
    const isPlaying = isCurrentTrackListInPlayer && !isPaused;
    const player = usePlayer();
    const playTrackList = useTrackListPlay(trackList);

    const onButtonClick = () => {
        if (isCurrentTrackListInPlayer) {
            player.togglePlay();
        } else {
            playTrackList(0);
        }
    };

    return <SpotiGreenButton type={isPlaying ? 'pause' : 'play'} onButtonClick={onButtonClick} />;
};

const isTrackListTypeEqual = (a: PlaybackTrackListType | null, b: TrackListModel | null) => {
    return a?.type === b?.type && (b?.type === 'savedTracks' || a?.entityId === b?.entityId);
};
