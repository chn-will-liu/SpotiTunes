import React from 'react';
import { useParams } from 'react-router-dom';
import { AlbumCard, AlbumCardSkeleton } from '../../components/album/AlbumCard';
import { useSpotify } from '../../hooks/useSpotify';

export const ArtistAlbums = () => {
    const { artistId } = useParams<{ artistId: string }>();

    const { data: albums, isLoading } = useSpotify({
        api: ['artists', 'albums'],
        queryKey: [artistId!],
        enabled: !!artistId,
    });

    let content: React.ReactNode;
    if (isLoading) {
        content = Array.from({ length: 12 }).map((_, i) => <AlbumCardSkeleton key={i} />);
    } else if (albums && albums.items.length > 0) {
        content = albums.items.map((album) => <AlbumCard album={album} key={album.id} />);
    } else {
        content = <div>No albums found</div>;
    }

    return <div className="grid p-4 auto-fill-[180px]">{content}</div>;
};

export const Component = ArtistAlbums;
