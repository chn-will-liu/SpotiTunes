import { Track } from '@spotify/web-api-ts-sdk';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProminentColor } from '../../hooks/useProminentColor';
import { pickImage } from '../../utils';
import { ArtistLinkList } from '../artist/ArtistLinkList';
import { AppBgContext } from '../shell/AppBgColor';
import { SpotiGreenButton } from '../SpotiGreenButton';
import { SpotiImage } from '../SpotiImage';
import { TrackListItem } from '../TrackListItem';

export interface TrackSearchResultProps {
    tracks: Track[];
    displayMode: 'all' | 'top-items';
}

export const TrackSearchResult = ({ tracks, displayMode }: TrackSearchResultProps) => {
    if (displayMode === 'top-items') {
        const [top, ...rest] = tracks.slice(0, 5);
        return (
            <div className="flex gap-4 p-4">
                <div className="w-2/5">
                    <TopTrackResult track={top} />
                </div>
                <div className="flex-1">
                    <h2 className="mb-2 text-xl font-semibold">Songs</h2>
                    <ul>
                        {rest.map((track) => (
                            <TrackListItem
                                key={track.id}
                                track={track}
                                album={track.album}
                                showAlbum
                                compactMode
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <ul>
            {tracks.map((track, index) => (
                <TrackListItem
                    key={track.id}
                    track={track}
                    album={track.album}
                    index={index}
                    showAlbum
                    showIndex
                />
            ))}
        </ul>
    );
};

const TopTrackResult = ({ track }: { track: Track }) => {
    const { setBg } = useContext(AppBgContext);
    const image = pickImage(track.album.images, 120);
    const bgColor = useProminentColor(image);
    const navigate = useNavigate();

    useEffect(() => {
        if (bgColor) {
            setBg({ color: bgColor });
        }
    }, [bgColor, image, setBg]);

    return (
        <>
            <h2 className="mb-2 text-xl font-semibold">Top result</h2>
            <div
                className="group relative block cursor-pointer rounded-lg bg-black bg-opacity-20 p-6 hover:bg-opacity-10"
                onClick={(e) => {
                    if (e.target instanceof HTMLAnchorElement) return;
                    navigate('/track/' + track.id);
                }}
            >
                <SpotiImage
                    images={track.album.images}
                    alt={track.album.name}
                    size={120}
                    className="mb-6"
                />
                <h3 className="mt-4 line-clamp-1 text-3xl">{track.name}</h3>
                <ArtistLinkList artists={track.artists} />
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpotiGreenButton type="play" />
                </div>
            </div>
        </>
    );
};
