import { NavLink, useParams } from 'react-router-dom';
import { SpotiGreenButton } from '../../components/SpotiGreenButton';
import { SpotiImage } from '../../components/SpotiImage';
import { useSpotify } from '../../hooks/useSpotify';

export const ArtistRelated = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const { data: related, isLoading } = useSpotify(
        (api) => api.artists.relatedArtists(artistId!),
        {
            queryKey: [artistId],
            enabled: !!artistId,
        }
    );
    if (isLoading) return <div>Loading...</div>;
    if (!related) return <div>No related artists found</div>;

    return (
        <div className="grid px-4 py-8 auto-fit-[180px] ">
            {related.artists.map((artist) => (
                <NavLink
                    key={artist.id}
                    title={artist.name}
                    to={'/artist/' + artist.id}
                    className="group rounded-md p-3 hover:bg-black hover:bg-opacity-45"
                >
                    <div className="relative">
                        <SpotiImage
                            images={artist.images}
                            alt={artist.name}
                            size={180}
                            type="artist"
                            displaySize="full"
                            className="mb-2"
                        />
                        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                            <SpotiGreenButton type="play" />
                        </div>
                    </div>
                    <div className="line-clamp-1" title={artist.name}>
                        {artist.name}
                    </div>
                    <div className="text-sm text-white text-opacity-65">artist</div>
                </NavLink>
            ))}
        </div>
    );
};

export const Component = ArtistRelated;
