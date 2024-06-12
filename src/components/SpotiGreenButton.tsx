import { FaPause, FaPlay } from 'react-icons/fa';

export type SpotiGreenButtonProps = {
    type: 'play' | 'pause';
    onButtonClick: () => void;
};

export const SpotiGreenButton = ({ type, onButtonClick }: SpotiGreenButtonProps) => {
    return (
        <button
            className="flex size-12 transform items-center justify-center rounded-full
    bg-spotiGreen shadow-md hover:scale-105 active:scale-100 active:opacity-75"
            onClick={onButtonClick}
        >
            {type === 'pause' ? (
                <FaPause className="size-4 text-black" />
            ) : (
                <FaPlay className="ml-1 size-4 text-black" />
            )}
        </button>
    );
};
