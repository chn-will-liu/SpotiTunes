import { MouseEventHandler, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

export type IconButtonProps = PropsWithChildren<{
    icon: IconType;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'max' | undefined;
    className?: string | undefined;
    hoverEffect?: 'opacity' | 'scale';
    onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const IconButton = (props: IconButtonProps) => {
    const sizeMap = {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-8',
        max: 'size-12',
    };

    const Icon = props.icon;

    let hoverEffect = '';
    if (props.hoverEffect === 'opacity') {
        hoverEffect = 'text-opacity-65 hover:text-opacity-100 active:scale-90';
    } else {
        hoverEffect = 'hover:scale-110 active:scale-100 ';
    }

    return (
        <button
            type="button"
            className={`translation-transform transform bg-transparent text-white ${hoverEffect} ${props.className ?? ''}`}
            onClick={props.onClick}
        >
            <Icon className={`${sizeMap[props.size ?? 'md']}`} />
            {props.children}
        </button>
    );
};
