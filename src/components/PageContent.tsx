import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { NavList } from './NavList';

export type PageContentProps = PropsWithChildren<{
    links?: { label: string; to: string }[];
    isLoading?: boolean;
}>;

export const PageContent = (props: PageContentProps) => {
    if (props.links) {
        return (
            <div>
                <nav className="relative flex h-20 items-center gap-5 bg-black bg-opacity-35 px-6">
                    <NavList links={props.links} isLoading={props.isLoading} />
                </nav>
                <Outlet />
            </div>
        );
    }
    return (
        <div className="bg-gradient-to-b from-[#00000045] to-transparent bg-top bg-no-repeat [background-size:100%_200px]">
            {props.children}
        </div>
    );
};
