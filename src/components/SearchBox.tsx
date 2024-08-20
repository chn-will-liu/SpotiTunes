import { useEffect, useRef, useState } from 'react';
import { RiCloseFill, RiSearch2Line } from 'react-icons/ri';
import { useDebounce } from '../hooks/useDebounce';
import { IconButton } from './IconButton';

export type SearchBoxProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const SearchBox = (props: SearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(props.value);
    const hasPendingValueChagnes = useRef(false);

    const onSearchTextChange = useDebounce(props.onChange, 300);

    useEffect(() => {
        const valueTrimmed = value.trimEnd();
        if (valueTrimmed !== props.value) {
            if (hasPendingValueChagnes.current) {
                onSearchTextChange(valueTrimmed);
                hasPendingValueChagnes.current = false;
            } else {
                inputRef.current?.focus();
            }
        }
    }, [value, props.value, onSearchTextChange, hasPendingValueChagnes]);

    return (
        <div
            className="relative flex items-center justify-center text-white text-opacity-70 focus-within:text-opacity-100"
            onClick={() => inputRef?.current?.focus()}
        >
            <input
                type="text"
                className="w-full rounded-lg bg-white bg-opacity-5 px-12 py-3 pr-4 text-sm font-light text-inherit placeholder:text-current"
                placeholder={props.placeholder}
                autoFocus
                onChange={(e) => {
                    setValue(e.target.value);
                    hasPendingValueChagnes.current = e.target.value.trimEnd() !== props.value;
                }}
                value={value}
                ref={inputRef}
            />
            <RiSearch2Line className="absolute left-3 size-7" />
            {props.value && (
                <IconButton
                    className="absolute right-3 size-7"
                    size="md"
                    onClick={() => {
                        setValue('');
                        hasPendingValueChagnes.current = true;
                    }}
                    icon={RiCloseFill}
                />
            )}
        </div>
    );
};
