import { useSpotify } from '../../hooks/useSpotify';
import { ArtistCard, ArtistCardSkeleton } from './ArtistCard';

export const RelatedArtists = ({ artistId }: { artistId: string | null }) => {
    const { data: related, isLoading } = useSpotify({
        api: ['artists', 'relatedArtists'],
        queryKey: [artistId!],
        enabled: !!artistId,
    });

    let content: React.ReactNode;

    if (isLoading) {
        content = Array.from({ length: 12 }).map((_, i) => <ArtistCardSkeleton key={i} />);
    } else if (related && related.artists.length > 0) {
        content = related.artists.map((artist) => <ArtistCard artist={artist} key={artist.id} />);
    } else {
        content = <div>No related artists found</div>;
    }

    return <div className="grid p-4 auto-fit-[180px] ">{content}</div>;
};
