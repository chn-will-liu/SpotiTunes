import { useRef } from 'react';
import { RiCloseFill, RiSearch2Line } from 'react-icons/ri';
import { useDebounce } from '../hooks/useDebounce';
import { IconButton } from './IconButton';

export type SearchBoxProps = {
    initialValue: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const SearchBox = (props: SearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onSearchTextChange = useDebounce(props.onChange, 300);

    return (
        <div
            className="relative flex items-center justify-center text-white text-opacity-70 focus-within:text-opacity-100"
            onClick={() => inputRef?.current?.focus()}
        >
            <input
                type="text"
                className="peer w-full rounded-lg bg-white bg-opacity-5 px-12 py-3 pr-4 text-sm font-light text-inherit placeholder:text-current"
                placeholder={props.placeholder}
                autoFocus
                onChange={(e) => {
                    onSearchTextChange(e.target.value.trimEnd());
                }}
                defaultValue={props.initialValue}
                ref={inputRef}
            />
            <IconButton
                className="absolute right-3 block size-7 peer-placeholder-shown:hidden"
                size="md"
                onClick={() => {
                    inputRef.current!.value = '';
                    onSearchTextChange('');
                }}
                icon={RiCloseFill}
            />
            <RiSearch2Line className="absolute left-3 size-7" />
        </div>
    );
};
