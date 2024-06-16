import { useContext } from 'react';
import { SdkContext } from '../spotify/SdkContext';
import { usePlayerStore } from '../spotify/webPlayer/playerStore';
import { PlayerState } from '../spotify/webPlayer/types';

export const usePlayer = () => {
    const { player } = useContext(SdkContext);
    return player;
};

export const usePlayerState = <T>(selector: (state: PlayerState) => T): T => {
    return usePlayerStore((state) => selector(state));
};
