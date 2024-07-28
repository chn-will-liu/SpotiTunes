import { Image, Track } from '@spotify/web-api-ts-sdk';
import { Link } from 'react-router-dom';
import { SkeletonItem } from '../../components/skeletons/SkeletonItem';
import { SpotiGreenButton } from '../../components/SpotiGreenButton';
import { SpotiImage } from '../../components/SpotiImage';
import { useSpotify } from '../../hooks/useSpotify';
import { likedSongsImage } from './linkedSongsImage';
import { MyPlaylistsSection } from './MyPlaylists';
import { MySavedAlbumSection } from './MySavedAlbums';
import { MySavedArtistsSection } from './MySavedArtists';

export const MyLibrary = () => {
    return (
        <>
            <MyTopItems />
            <MyPlaylistsSection />
            <MySavedAlbumSection />
            <MySavedArtistsSection />
        </>
    );
};

const MyTopItems = () => {
    const { data, isLoading } = useSpotify({
        api: ['currentUser', 'topItems'],
        queryKey: ['tracks', 'medium_term', 5],
    });

    const loadingItems = Array.from({ length: 6 }, (_, index) => <TopItemSkeleton key={index} />);

    return (
        <div className="m-5 mt-10 grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? (
                loadingItems
            ) : (
                <>
                    <TopItem title="Liked songs" link="/my/favorite" images={likedSongsImage} />
                    {data?.items.map((item, index) => (
                        <TopItem
                            key={index}
                            title={item.name}
                            link={`/track/${item.id}`}
                            images={(item as Track).album.images}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

const TopItemSkeleton = () => {
    return <SkeletonItem className="h-16 rounded-md" />;
};

type TopItemProps = {
    title: string;
    link: string;
    images: Image[];
};

const TopItem = (props: TopItemProps) => {
    return (
        <Link
            className="group flex h-16 items-center gap-4 overflow-clip rounded-md bg-white bg-opacity-15 pr-4 hover:bg-opacity-25"
            to={props.link}
        >
            <div className="aspect-square max-h-full shrink-0 ">
                <SpotiImage
                    images={props.images}
                    alt={props.title}
                    size={180}
                    displaySize="full"
                    rounded="none"
                />
            </div>
            <span className="line-clamp-2 flex-1 font-light">{props.title}</span>
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
                <SpotiGreenButton type="play" />
            </div>
        </Link>
    );
};

export const Component = MyLibrary;
