import { useSpotify } from '../../hooks/useSpotify';
import { AlbumListSection, AlbumListSectionSkeleton } from '../album/AlbumListSection';
import { ArtistListSection, ArtistListSectionSkeleton } from '../artist/ArtistListSection';
import { PlaylistSeciton, PlaylistSectionSkeleton } from '../playlist/PlaylistSection';
import { TrackSearchResult } from './TrackSearchResult';

export type SearchResultProps = {
    searchType: Array<'album' | 'artist' | 'playlist' | 'track'>;
    displayMode: 'all' | 'top-items';
    searchText: string;
    className?: string;
};

export const SearchResult = (props: SearchResultProps) => {
    const displayModeAll = props.displayMode === 'all';
    const { data, isLoading } = useSpotify({
        api: ['search'],
        queryKey: [props.searchText, props.searchType, undefined, displayModeAll ? 50 : 6],
        enabled: !!props.searchText,
        staleTime: 0,
    });

    if (isLoading) {
        return (
            <div className={props.className}>
                {props.searchType.includes('artist') && (
                    <ArtistListSectionSkeleton
                        displayMode={props.displayMode}
                        hideTitle={displayModeAll}
                    />
                )}
                {props.searchType.includes('album') && (
                    <AlbumListSectionSkeleton
                        displayMode={props.displayMode}
                        hideTitle={displayModeAll}
                    />
                )}
                {props.searchType.includes('playlist') && (
                    <PlaylistSectionSkeleton
                        displayMode={props.displayMode}
                        hideTitle={displayModeAll}
                    />
                )}
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className={props.className}>
            {data.tracks && data.tracks.items.length > 0 && (
                <TrackSearchResult tracks={data.tracks.items} displayMode={props.displayMode} />
            )}
            {data.artists && data.artists.items.length > 0 && (
                <ArtistListSection
                    title={props.displayMode === 'top-items' ? 'Artists' : undefined}
                    artists={data.artists.items}
                    displayMode={props.displayMode}
                    link="./artist"
                />
            )}
            {data.albums && data.albums.items.length > 0 && (
                <AlbumListSection
                    title={props.displayMode === 'top-items' ? 'Albums' : undefined}
                    albums={data.albums.items}
                    displayMode={props.displayMode}
                    link="./album"
                />
            )}
            {data.playlists && data.playlists.items.length > 0 && (
                <PlaylistSeciton
                    title={props.displayMode === 'top-items' ? 'Playlists' : undefined}
                    playlists={data.playlists.items}
                    displayMode={props.displayMode}
                    link="./playlist"
                />
            )}
        </div>
    );
};
