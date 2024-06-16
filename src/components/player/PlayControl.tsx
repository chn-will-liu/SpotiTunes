import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from 'react-icons/tb';
import { usePlayer } from '../../hooks/usePlayer';
import { IconButton } from '../IconButton';
import { PlayButton } from './Buttons';

export const PlayControl = () => {
    const player = usePlayer();
    return (
        <>
            <IconButton
                icon={TbPlayerSkipBackFilled}
                size="lg"
                hoverEffect="opacity"
                onClick={() => player.skipToPrevious()}
            />
            <PlayButton />
            <IconButton
                icon={TbPlayerSkipForwardFilled}
                size="lg"
                hoverEffect="opacity"
                onClick={() => player.skipToNext()}
            />
        </>
    );
};
