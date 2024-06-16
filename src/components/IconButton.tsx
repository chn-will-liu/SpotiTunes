import { MouseEventHandler, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

export type IconButtonProps = PropsWithChildren<{
    icon: IconType;
    size?: 'sm' | 'md' | 'lg' | 'max' | undefined;
    className?: string | undefined;
    hoverEffect?: 'opacity' | 'scale';
    onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const IconButton = (props: IconButtonProps) => {
    const sizeMap = {
        sm: 'size-5',
        md: 'size-6',
        lg: 'size-8',
        max: 'size-12',
    };

    const Icon = props.icon;

    let hoverEffect = '';
    if (props.hoverEffect === 'opacity') {
        hoverEffect = 'opacity-65 hover:opacity-100 active:scale-90';
    } else {
        hoverEffect = 'hover:scale-110 active:scale-100 ';
    }

    return (
        <button
            type="button"
            className={`translation-transform transform bg-transparent ${hoverEffect} ${props.className ?? ''}`}
            onClick={props.onClick}
        >
            <Icon className={`${sizeMap[props.size ?? 'md']}`} />
            {props.children}
        </button>
    );
};
