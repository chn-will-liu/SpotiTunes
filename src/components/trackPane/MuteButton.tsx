import { useEffect, useRef, useState } from 'react';
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from 'react-icons/bi';
import { usePlayer, usePlayerState } from '../../hooks/usePlayer';
import { IconButton } from '../IconButton';

export const MuteButton = () => {
    const [isMuted, setIsMuted] = useState(false);
    const player = usePlayer();
    const originalVolume = useRef(1);
    const currentVolume = usePlayerState((state) => state.volume);
    const volumeIcon = isMuted ? BiVolumeMute : currentVolume > 0.5 ? BiVolumeFull : BiVolumeLow;

    useEffect(() => {
        if (currentVolume > 0) {
            setIsMuted(false);
            originalVolume.current = currentVolume;
        } else {
            setIsMuted(true);
        }
    }, [currentVolume]);

    return (
        <IconButton
            icon={volumeIcon}
            size="lg"
            onClick={() => {
                if (isMuted) {
                    player.setVolume(originalVolume.current);
                } else {
                    player.setVolume(0);
                }
                setIsMuted((m) => !m);
            }}
        />
    );
};
