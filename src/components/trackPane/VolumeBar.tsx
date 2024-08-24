import { useState, useTransition } from 'react';
import { usePlayer, usePlayerState } from '../../hooks/usePlayer';
import { ProgressBar } from '../ProgressBar';

export const VolumeBar = () => {
    const player = usePlayer();
    const storeVolume = usePlayerState((state) => state.volume);
    const [volume, setVolume] = useState(storeVolume);
    const [isDragging, setIsDragging] = useState(false);
    const [, starTransition] = useTransition();

    if (!isDragging && volume !== storeVolume) {
        setVolume(storeVolume);
        return;
    }

    return (
        <ProgressBar
            progress={volume}
            onChange={(value) => {
                setVolume(value);
                starTransition(() => player.setVolume(value));
            }}
            isDraggingChange={setIsDragging}
        />
    );
};
