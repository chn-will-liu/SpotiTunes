import { useSpotify } from '../../hooks/useSpotify';
import { ArtistCard } from './ArtistCard';

export const RelatedArtists = ({ artistId }: { artistId: string }) => {
    const { data: related, isLoading } = useSpotify({
        api: ['artists', 'relatedArtists'],
        queryKey: [artistId],
        enabled: !!artistId,
    });
    if (isLoading) return <div>Loading...</div>;
    if (!related) return <div>No related artists found</div>;

    return (
        <div className="grid p-4 auto-fit-[180px] ">
            {related.artists.map((artist) => (
                <ArtistCard artist={artist} key={artist.id} />
            ))}
        </div>
    );
};
