import { MouseEventHandler, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

export type IconButtonProps = PropsWithChildren<{
    icon: IconType;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | undefined;
    className?: string | undefined;
    hoverEffect?: 'opacity' | 'scale';
    onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const IconButton = (props: IconButtonProps) => {
    const sizeMap = {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5',
        xl: 'size-7',
        xxl: 'size-9',
    };

    const Icon = props.icon;

    let hoverEffect = '';
    if (props.hoverEffect === 'opacity') {
        hoverEffect = 'text-opacity-65 hover:text-opacity-100';
    } else {
        hoverEffect = 'transform hover:scale-110';
    }

    return (
        <button
            type="button"
            className={`bg-transparent text-white ${hoverEffect} ${props.className ?? ''}`}
            onClick={props.onClick}
        >
            <Icon className={`${sizeMap[props.size ?? 'md']}`} />
            {props.children}
        </button>
    );
};
