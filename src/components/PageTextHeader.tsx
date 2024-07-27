import { PropsWithChildren } from 'react';

export type PageTextHeaderProps = PropsWithChildren<{
    className?: string;
}>;
export const PageTextHeader = ({ children, className }: PageTextHeaderProps) => {
    return <h1 className={`mb-5 mt-10 px-5 text-4xl font-normal ${className}`}>{children}</h1>;
};
