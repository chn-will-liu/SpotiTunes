import { Image } from '@spotify/web-api-ts-sdk';
import { prominent } from 'color.js';
import { useEffect, useState } from 'react';

type Rgb = [r: number, g: number, b: number];
const colorMap = new Map<string, string>();
export const useProminentColor = (image: Image | null) => {
    const [color, setColor] = useState<string | null>(null);
    useEffect(() => {
        if (image) {
            if (colorMap.has(image.url)) {
                setColor(colorMap.get(image.url)!);
                return;
            }
            prominent(image.url, { amount: 10, group: 45, format: 'array', sample: 10 }).then(
                (output) => {
                    const colorWithVividness = (output as Rgb[])
                        .map((color) => ({
                            color,
                            vividness: getVividness(color),
                        }))
                        .sort((a, b) => b.vividness - a.vividness);

                    const color = colorWithVividness[0].color;
                    const colorString = `rgb(${color[0]} ${color[1]} ${color[2]})`;
                    colorMap.set(image.url, colorString);
                    setColor(colorString);
                }
            );
        }
    }, [image]);
    return color;
};

function getVividness([r, g, b]: Rgb) {
    return (r ** 2 + g ** 2 + b ** 2 - r * g - r * b - g * b) ** 0.5;
}
