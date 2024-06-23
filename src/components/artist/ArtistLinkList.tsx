import { Link } from 'react-router-dom';

export type ArtistLinkListProps = {
    artists: { name: string; id: string }[];
    className?: string;
    usePrimaryColor?: boolean;
};

export const ArtistLinkList = ({ artists, className, usePrimaryColor }: ArtistLinkListProps) => {
    return (
        <>
            {artists.map((artist, index) => (
                <span key={artist.id}>
                    <Link
                        to={'/artist/' + artist.id}
                        className={`${className} text-sm text-white ${usePrimaryColor ? '' : 'text-opacity-65'} hover:text-opacity-100 hover:underline`}
                    >
                        {artist.name}
                    </Link>
                    {index < artists.length - 1 ? ', ' : ''}
                </span>
            ))}
        </>
    );
};
