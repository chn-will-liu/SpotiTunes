import { usePlayer, usePlayerState } from '../../hooks/usePlayer';
import { ProgressBar } from '../ProgressBar';

export const VolumeBar = () => {
    const player = usePlayer();
    const volume = usePlayerState((state) => state.volume);

    return (
        <ProgressBar
            progress={volume}
            onChange={(value) => {
                player.setVolume(value);
            }}
        />
    );
};
