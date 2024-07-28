import { PropsWithChildren } from 'react';
import { SkeletonItem } from './skeletons/SkeletonItem';

export type PageTextHeaderProps = PropsWithChildren<{
    className?: string;
}>;
export const PageTextHeader = ({ children, className }: PageTextHeaderProps) => {
    return <h1 className={`mb-5 mt-10 px-5 text-4xl font-normal ${className}`}>{children}</h1>;
};

export const PageTextHeaderSkeleton = (props: PageTextHeaderProps) => {
    return (
        <PageTextHeader {...props}>
            <SkeletonItem className="h-10 w-1/3" />
        </PageTextHeader>
    );
};
