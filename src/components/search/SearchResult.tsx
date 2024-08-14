import { useSpotify } from '../../hooks/useSpotify';
import { AlbumListSection, AlbumListSectionSkeleton } from '../album/AlbumListSection';
import { ArtistListSection, ArtistListSectionSkeleton } from '../artist/ArtistListSection';
import { PlaylistSeciton, PlaylistSectionSkeleton } from '../playlist/PlaylistSection';

export type SearchResultProps = {
    searchType: Array<'album' | 'artist' | 'playlist' | 'track'>;
    displayMode: 'all' | 'top-items';
    searchText: string;
};

export const SearchResult = (props: SearchResultProps) => {
    const { data, isLoading } = useSpotify({
        api: ['search'],
        queryKey: [
            props.searchText,
            props.searchType,
            undefined,
            props.displayMode === 'all' ? 50 : 6,
        ],
        enabled: !!props.searchText,
    });

    if (isLoading) {
        return (
            <>
                {props.searchType.includes('artist') && (
                    <ArtistListSectionSkeleton displayMode={props.displayMode} hideTitleInAllMode />
                )}
                {props.searchType.includes('album') && (
                    <AlbumListSectionSkeleton displayMode={props.displayMode} />
                )}
                {props.searchType.includes('playlist') && (
                    <PlaylistSectionSkeleton displayMode={props.displayMode} />
                )}
            </>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <>
            {data.artists && data.artists.items.length > 0 && (
                <ArtistListSection
                    title={props.displayMode === 'top-items' ? 'Artists' : undefined}
                    artists={data.artists.items}
                    displayMode={props.displayMode}
                    link="./artists"
                />
            )}
            {data.albums && data.albums.items.length > 0 && (
                <AlbumListSection
                    title={props.displayMode === 'top-items' ? 'Albums' : undefined}
                    albums={data.albums.items}
                    displayMode={props.displayMode}
                    link="./albums"
                />
            )}
            {data.playlists && data.playlists.items.length > 0 && (
                <PlaylistSeciton
                    title={props.displayMode === 'top-items' ? 'Playlists' : undefined}
                    playlists={data.playlists.items}
                    displayMode={props.displayMode}
                    link="./playlists"
                />
            )}
        </>
    );
};
