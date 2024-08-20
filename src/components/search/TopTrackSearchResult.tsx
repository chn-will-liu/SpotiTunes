import { Track } from '@spotify/web-api-ts-sdk';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProminentColor } from '../../hooks/useProminentColor';
import { pickImage } from '../../utils';
import { ArtistLinkList } from '../artist/ArtistLinkList';
import { AppBgContext } from '../shell/AppBgColor';
import { SkeletonItem } from '../skeletons/SkeletonItem';
import { SpotiGreenButton } from '../SpotiGreenButton';
import { SpotiImage } from '../SpotiImage';

export const TopTrackSearchResultSkeleton = () => {
    return (
        <div className="group relative block rounded-lg bg-black bg-opacity-20 p-6 ">
            <SkeletonItem className="mb-6 size-[120px] rounded-md" />
            <SkeletonItem className="my-4 h-8 w-1/2" />
            <SkeletonItem className="h-4 w-1/4" />
        </div>
    );
};

export const TopTrackSearchResult = ({ track }: { track: Track }) => {
    const { setBg } = useContext(AppBgContext);
    const image = pickImage(track.album.images, 120);
    const bgColor = useProminentColor(image);
    const navigate = useNavigate();

    useEffect(() => {
        if (bgColor) {
            setBg({ color: bgColor });
        }
    }, [bgColor, image, setBg]);

    return (
        <>
            <h2 className="mb-2 text-xl font-semibold">Top result</h2>
            <div
                className="group relative cursor-pointer rounded-lg bg-black bg-opacity-20 p-6 hover:bg-opacity-10"
                onClick={(e) => {
                    if (e.target instanceof HTMLAnchorElement) return;
                    navigate('/track/' + track.id);
                }}
            >
                <SpotiImage
                    images={track.album.images}
                    alt={track.album.name}
                    size={120}
                    className="mb-6"
                />
                <h3 className="mt-4 line-clamp-1 text-3xl">{track.name}</h3>
                <ArtistLinkList artists={track.artists} />
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <SpotiGreenButton type="play" />
                </div>
            </div>
        </>
    );
};
