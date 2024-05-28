import { useContext } from 'react';
import { SdkContext } from './SpotifySdk';
import { usePlayerStore } from './WebPlayer/playerStore';
import { PlayerState } from './WebPlayer/types';

export const usePlayer = () => {
    const { player } = useContext(SdkContext);
    return player;
};

export const usePlayerState = <T>(selector: (state: PlayerState) => T): T => {
    return usePlayerStore((state) => selector(state));
};
