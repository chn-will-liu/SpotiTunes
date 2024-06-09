import { NavLink } from 'react-router-dom';

export type ArtistLinkListProps = {
    artists: { name: string; id: string }[];
    className?: string;
};

export const ArtistLinkList = ({ artists, className }: ArtistLinkListProps) => {
    return (
        <>
            {artists.map((artist, index) => (
                <span key={artist.id}>
                    <NavLink
                        to={'/artist/' + artist.id}
                        className={`${className} text-sm text-white text-opacity-65 hover:text-opacity-100 hover:underline`}
                    >
                        {artist.name}
                    </NavLink>
                    {index < artists.length - 1 ? ', ' : ''}
                </span>
            ))}
        </>
    );
};
