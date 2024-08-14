import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { NavList } from '../NavList';

export type PageContentProps = PropsWithChildren<{
    links?: { label: string; to: string }[];
    isLoading?: boolean;
}>;

export const PageContent = (props: PageContentProps) => {
    if (props.links) {
        return (
            <div>
                <NavList links={props.links} isLoading={props.isLoading} />
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
