import { MouseEventHandler, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

export type IconButtonProps = PropsWithChildren<{
    icon: IconType;
    size?: 'sm' | 'md' | 'lg' | 'max' | undefined;
    className?: string | undefined;
    hoverEffect?: 'opacity' | 'scale';
    buttonStyle?: 'transparent' | 'rounded';
    disabled?: boolean;
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
        hoverEffect = 'opacity-65 hover:opacity-100 active:scale-90 disabled:opacity-65';
    } else {
        hoverEffect = 'hover:scale-110 active:scale-100 disabled:scale-100';
    }

    let bgStyle = 'bg-transparent';
    if (props.buttonStyle === 'rounded') {
        bgStyle = 'bg-white bg-opacity-30 rounded-full hover:bg-opacity-40 disabled:bg-opacity-10';
    }

    return (
        <button
            type="button"
            className={`translation-transform transform ${bgStyle} ${hoverEffect} disabled:opacity-50 ${props.className ?? ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <Icon className={`${sizeMap[props.size ?? 'md']}`} />
            {props.children}
        </button>
    );
};
