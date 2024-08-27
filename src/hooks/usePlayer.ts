import { useContext } from 'react';
import { SdkContext } from '../spotify/SdkContext';
import { PlayerState } from '../spotify/webPlayer/playerStore.types';

export const usePlayer = () => useContext(SdkContext).player;

export const usePlayerState = <T>(selector: (state: PlayerState) => T): T => {
    const { usePlayerStore } = usePlayer();
    return usePlayerStore(selector);
};
