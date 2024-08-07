export type SkeletonItemProps = {
    className?: string;
};
export const SkeletonItem = (props: SkeletonItemProps) => {
    return (
        <div className={`relative overflow-clip bg-white bg-opacity-15 ${props.className}`}>
            <div className="absolute h-full w-16 animate-skeleton-loading bg-gradient-to-r from-[#ffffff05] via-[#ffffff25] to-[#ffffff05]"></div>
        </div>
    );
};
