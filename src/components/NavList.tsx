import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SkeletonItem } from './skeletons/SkeletonItem';

export type NavListProps = {
    links: { label: string; to: string }[];
    isLoading?: boolean;
};

export const NavList = ({ links, isLoading }: NavListProps) => {
    const navRef = useRef<HTMLUListElement | null>(null);
    const [indicator, setIndicator] = useState({ width: 20, left: -20 });
    const location = useLocation();

    useLayoutEffect(() => {
        if (navRef.current && !isLoading) {
            const activeEl = navRef.current.querySelector('a.active');
            if (activeEl) {
                const rect = activeEl.getBoundingClientRect();
                const containerRect = navRef.current.getBoundingClientRect();
                setIndicator({
                    left: rect.left - containerRect.left + rect.width / 2,
                    width: rect.width,
                });
            }
        }
    }, [navRef, location, isLoading]);

    return (
        <>
            <ul className="mr-12 flex h-full gap-10" ref={navRef}>
                {links.map((link) => (
                    <li key={link.to}>
                        {isLoading ? (
                            <SkeletonItem className="h-1/2 w-32 translate-y-1/2" />
                        ) : (
                            <NavLink
                                end
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex h-full items-center text-lg text-white hover:text-opacity-100 ${isActive ? 'active text-opacity-100' : 'text-opacity-65'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
            {!isLoading && <NavIndicator {...indicator} />}
        </>
    );
};

const NavIndicator = ({ left, width }: { left: number; width: number }) => {
    return (
        <div
            className="absolute left-6 top-[100%] h-[5px] w-6 rounded-sm bg-white shadow-[0px_-5px_12px_1px_white] transition-all duration-200"
            style={{
                transform: `translateX(calc(-50% + ${left}px))`,
                width: `${Math.min(30, width / 2)}px`,
            }}
        />
    );
};
