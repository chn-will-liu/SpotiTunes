import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { transformSpotifyURI } from '../spotify/transformSpotifyUri';

export type TextWithHrefProps = {
    text: string;
    removeHref?: boolean;
};

export const TextWithHref = ({ text, removeHref }: TextWithHrefProps) => {
    const data = useMemo(() => {
        if (removeHref) {
            return text.split(/<a[^>]*>([^<]+)<\/a>/g).join('');
        } else {
            return text
                .split(/(<a[^>]*>[^<]+<\/a>)/g)
                .map((part) => {
                    if (part.startsWith('<a')) {
                        const href = part.match(/href=['"]?([^">\s]+)/)?.[1];
                        const text = part.match(/<a[^>]*>([^<]+)<\/a>/)?.[1];
                        return {
                            type: 'link',
                            href: transformSpotifyURI(href),
                            text,
                        };
                    } else {
                        return {
                            type: 'text',
                            text: part,
                            href: undefined,
                        };
                    }
                })
                .filter((part) => !!part.text);
        }
    }, [text, removeHref]);

    if (typeof data === 'string') {
        return <span>{data}</span>;
    }

    return (
        <span>
            {data.map((part, index) => {
                if (part.type === 'link' && part.href) {
                    return (
                        <Link key={index} to={part.href} className="font-normal hover:underline">
                            {part.text}
                        </Link>
                    );
                }
                return <span key={index}> {part.text} </span>;
            })}
        </span>
    );
};
