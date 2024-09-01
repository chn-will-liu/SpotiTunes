import clsx from 'clsx';
import { Link } from 'react-router-dom';

export type ArtistLinkListProps = {
    artists: { name: string; uri: string }[];
    className?: string;
    usePrimaryColor?: boolean;
};

export const ArtistLinkList = ({ artists, className, usePrimaryColor }: ArtistLinkListProps) => {
    return (
        <>
            {artists.map((artist, index) => (
                <span key={artist.uri}>
                    <Link
                        to={'/artist/' + artist.uri.split(':')[2]}
                        className={`text-sm text-white hover:text-opacity-100 hover:underline ${clsx(
                            [className, !usePrimaryColor && 'text-opacity-65']
                        )}`}
                    >
                        {artist.name}
                    </Link>
                    {index < artists.length - 1 ? ', ' : ''}
                </span>
            ))}
        </>
    );
};
