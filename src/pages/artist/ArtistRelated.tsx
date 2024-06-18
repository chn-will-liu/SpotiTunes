import { useParams } from 'react-router-dom';
import { RelatedArtists } from '../../components/RelatedArtist';

export const ArtistRelated = () => {
    const { artistId } = useParams<{ artistId: string }>();
    return <RelatedArtists artistId={artistId!} />;
};

export const Component = ArtistRelated;
