import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export type NavListProps = {
    links: { label: string; to: string }[];
};

export const NavList = ({ links }: NavListProps) => {
    const navRef = useRef<HTMLUListElement | null>(null);
    const [indicator, setIndicator] = useState({ width: 20, left: -20 });
    const location = useLocation();

    useLayoutEffect(() => {
        if (navRef.current) {
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
    }, [navRef, location]);

    return (
        <>
            <ul className="mr-12 flex h-full gap-5" ref={navRef}>
                {links.map((link) => (
                    <li key={link.to} className="">
                        <NavLink
                            end
                            to={link.to}
                            className={({ isActive }) =>
                                `flex h-full items-center text-lg text-white hover:text-opacity-100 ${isActive ? 'active text-opacity-100' : 'text-opacity-65'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <NavIndicator {...indicator} />
        </>
    );
};

const NavIndicator = ({ left, width }: { left: number; width: number }) => {
    return (
        <div
            className="absolute left-6 top-[100%] h-[5px] w-6 rounded-sm bg-white shadow-[0px_-5px_12px_1px_white] transition-all duration-200"
            style={{ transform: `translateX(calc(-50% + ${left}px))`, width: `${width / 2}px` }}
        />
    );
};
