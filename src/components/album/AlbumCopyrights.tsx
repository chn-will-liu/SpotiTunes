import { Album } from '@spotify/web-api-ts-sdk';
import { useFormatter } from '../../hooks/useFormatter';

export type AlbumCopyrightsProps = {
    album: Album;
    className?: string;
};
export const AlbumCopyrights = ({ album, className }: AlbumCopyrightsProps) => {
    const formatter = useFormatter();
    return (
        <div className={`${className} text-sm text-white text-opacity-65`}>
            <div>
                {formatter.formatDate(new Date(album.release_date), {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                })}
            </div>
            <div className="text-xs">
                {album.copyrights.map((copyright, index) => (
                    <p key={index}>{copyright.text}</p>
                ))}
            </div>
        </div>
    );
};
