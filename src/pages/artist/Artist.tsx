import { NavLink, Outlet, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { TrackListPlayButton } from '../../components/TrackListPlayButton';
import { useArtistTopTracks } from '../../hooks/useArtistTopTracks';
import { useFormatter } from '../../hooks/useFormatter';

export const PageArtist = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const formatter = useFormatter();

    const { topTracks, artist, isLoading } = useArtistTopTracks(artistId!);

    if (isLoading) return <div>Loading...</div>;
    if (!artist) return <div>Artist not found</div>;

    const links = [
        {
            label: 'Popular',
            to: '',
        },
        {
            label: 'Albums',
            to: './albums',
        },
        {
            label: 'Fans also like',
            to: './fans-also-like',
        },
    ];

    return (
        <div>
            <PageHeader type="Artist" header={artist.name} images={artist.images}>
                <div>{formatter.formatNumber(artist.followers.total)} followers</div>
            </PageHeader>
            <nav className="flex h-20 items-center gap-5 bg-black bg-opacity-35 px-6">
                <ul className="mr-12 flex gap-5">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                end
                                to={link.to}
                                className={({ isActive }) =>
                                    `text-lg text-white hover:text-opacity-100 ${isActive ? 'text-opacity-100' : 'text-opacity-65'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <TrackListPlayButton
                    tracks={topTracks?.tracks ?? []}
                    type="artistPopularTracks"
                    entityId={artist?.id}
                />
            </nav>
            <Outlet />
        </div>
    );
};

export const Component = PageArtist;
