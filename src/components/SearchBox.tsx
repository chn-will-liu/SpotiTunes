import { RiSearch2Line } from 'react-icons/ri';

export const SearchBox = () => {
    return (
        <div className="relative mx-6 mb-8 mt-6 flex items-center justify-center text-white text-opacity-70 focus-within:text-opacity-100">
            <input
                type="text"
                className="w-full rounded-lg py-3 pl-12 pr-4 font-light text-inherit placeholder:text-current"
                placeholder="Search"
            />
            <RiSearch2Line className="absolute left-3 size-7" />
        </div>
    );
};
