import { useEffect, useRef, useState } from 'react';
import { RiCloseFill, RiSearch2Line } from 'react-icons/ri';
import { useDebounce } from '../hooks/useDebounce';
import { IconButton } from './IconButton';

export type SearchBoxProps = {
    value: string;
    onChange: (value: string) => void;
};

export const SearchBox = (props: SearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(props.value);

    const onSearchTextChange = useDebounce(props.onChange, 300);

    useEffect(() => {
        const valueTrimed = value.trimEnd();
        if (valueTrimed !== props.value) {
            onSearchTextChange(valueTrimed);
        }
    }, [value, props.value, onSearchTextChange]);

    return (
        <div
            className="relative flex items-center justify-center text-white text-opacity-70 focus-within:text-opacity-100"
            onClick={() => inputRef?.current?.focus()}
        >
            <input
                type="text"
                className="w-full rounded-lg bg-white bg-opacity-5 px-12 py-3 pr-4 text-sm font-light text-inherit placeholder:text-current"
                placeholder="Search"
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                value={value}
                ref={inputRef}
            />
            <RiSearch2Line className="absolute left-3 size-7" />
            {props.value && (
                <IconButton
                    className="absolute right-3 size-7"
                    size="md"
                    onClick={() => setValue('')}
                    icon={RiCloseFill}
                />
            )}
        </div>
    );
};
