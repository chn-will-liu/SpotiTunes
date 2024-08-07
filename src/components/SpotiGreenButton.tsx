import { FaPause, FaPlay } from 'react-icons/fa';

export type SpotiGreenButtonProps = {
    type: 'play' | 'pause';
    onButtonClick?: () => void;
};

export const SpotiGreenButton = ({ type, onButtonClick }: SpotiGreenButtonProps) => {
    return (
        <button
            className="inline-flex size-12 min-w-12 transform items-center justify-center
    rounded-full bg-spotiGreen shadow-md shadow-black hover:scale-105 active:scale-100 active:opacity-75"
            onClick={onButtonClick}
            tabIndex={onButtonClick ? 0 : -1}
        >
            {type === 'pause' ? (
                <FaPause className="size-4 text-black" />
            ) : (
                <FaPlay className="ml-1 size-4 text-black" />
            )}
        </button>
    );
};
