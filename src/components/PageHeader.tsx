import { Image } from '@spotify/web-api-ts-sdk';
import { prominent } from 'color.js';
import { PropsWithChildren, useEffect, useState } from 'react';
import { pickImage } from '../utils';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}

export type PageHeaderProps = PropsWithChildren<{
    type: 'Song' | 'Artist' | 'Album' | 'Playlist';
    images: Image[];
    header: string;
}>;

export const PageHeader = (props: PageHeaderProps) => {
    const image = pickImage(props.images, 240);
    const bgColor = usePromoninentColor(image);
    const isArtist = props.type === 'Artist';

    return (
        <header className="flex items-end gap-5 bg-gradient-to-t from-[#00000044] to-transparent to-50% p-6">
            <div
                className="absolute inset-0 top-0 z-[-1] h-[800px] w-full bg-gradient-to-t from-transparent  via-[#00000088] via-25% to-[var(--page-header-bg-color)] to-50%"
                style={{ '--page-header-bg-color': bgColor }}
            ></div>
            <img
                src={image?.url}
                alt={props.header}
                className={`${isArtist ? 'rounded-full' : 'rounded-md'} size-[240px] shadow-xl`}
            />
            <div className="text-shadow-lg">
                {!isArtist && <div>{props.type}</div>}
                <h1 className=" text-[5rem] font-bold">{props.header}</h1>
                {props.children}
            </div>
        </header>
    );
};

type Rgb = [r: number, g: number, b: number];
const usePromoninentColor = (image: Image | null) => {
    const [color, setColor] = useState<string>('transparent');
    useEffect(() => {
        if (image) {
            prominent(image.url, { amount: 10, group: 45, format: 'array' }).then((output) => {
                const colorWithVividness = (output as Rgb[])
                    .map((color) => ({
                        color,
                        vividness: getVividness(color),
                    }))
                    .sort((a, b) => b.vividness - a.vividness);

                const color = colorWithVividness[0].color;
                setColor(`rgb(${color[0]} ${color[1]} ${color[2]})`);
            });
        }
    }, [image]);
    return color;
};

function getVividness([r, g, b]: Rgb) {
    return (r ** 2 + g ** 2 + b ** 2 - r * g - r * b - g * b) ** 0.5;
}
