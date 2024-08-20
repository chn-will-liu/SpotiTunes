import { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppBgContext } from './shell/AppBgColor';
import { SkeletonItem } from './skeletons/SkeletonItem';

export type NavListProps = {
    links: { label: string; to: string }[];
    isLoading?: boolean;
};

export const NavList = ({ links, isLoading }: NavListProps) => {
    const navRef = useRef<HTMLUListElement | null>(null);
    const { bg } = useContext(AppBgContext);
    const { isStuck } = useIsStuck(navRef);
    const { indicator } = useActiveIndicator({
        navRef,
        isLoading,
        initial: { width: 20, left: -20 },
    });

    return (
        <nav
            ref={navRef}
            className={`sticky -top-1 z-10 flex h-20 items-center gap-5 px-6 ${isStuck ? 'shadow-lg' : ''}`}
            style={{
                backgroundColor: `color-mix(in srgb,${bg.color} 30%, black 70%)`,
            }}
        >
            <ul className=" mr-12 flex h-full gap-10">
                {links.map((link) => (
                    <li key={link.to}>
                        {isLoading ? (
                            <SkeletonItem className="h-1/2 w-32 translate-y-1/2" />
                        ) : (
                            <NavLink
                                end
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex h-full items-center text-lg text-white text-shadow-lg hover:text-opacity-100 ${isActive ? 'active text-opacity-100' : 'text-opacity-65'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
            {!isLoading && <NavIndicator {...indicator} />}
        </nav>
    );
};

const NavIndicator = ({ left, width }: { left: number; width: number }) => {
    return (
        <div
            className="absolute left-6 top-[100%] h-[5px] w-6 rounded-sm bg-white shadow-[0px_-5px_12px_1px_white] transition-all duration-200"
            style={{
                transform: `translateX(calc(-50% + ${left}px))`,
                width: `${Math.max(30, width / 2)}px`,
            }}
        />
    );
};

type useActiveIndicatorHookArgs = {
    navRef: RefObject<HTMLElement>;

    isLoading?: boolean;
    initial: { width: number; left: number };
};
const useActiveIndicator = ({ navRef, isLoading, initial }: useActiveIndicatorHookArgs) => {
    const [indicator, setIndicator] = useState(initial);

    const location = useLocation();

    useLayoutEffect(() => {
        if (navRef.current && !isLoading) {
            const activeEl = navRef.current.querySelector('a.active');
            if (activeEl) {
                const rect = activeEl.getBoundingClientRect();
                const containerRect = navRef.current.getBoundingClientRect();
                const paddingLeft = navRef.current
                    .computedStyleMap()
                    .get('padding-left') as CSSUnitValue;
                setIndicator({
                    left: rect.left - containerRect.left - paddingLeft.value + rect.width / 2,
                    width: rect.width,
                });
            }
        }
    }, [navRef, location, isLoading]);

    return { indicator };
};

const useIsStuck = (ref: RefObject<HTMLElement>) => {
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const observer = new IntersectionObserver(
                ([e]) => setIsStuck(e.intersectionRatio < 1),
                {
                    threshold: [1],
                }
            );
            observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [ref]);

    return { isStuck };
};
