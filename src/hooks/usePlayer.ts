import { useContext } from 'react';
import { SdkContext } from '../spotify/SdkContext';
import { usePlayerStore } from '../spotify/webPlayer/playerStore';
import { PlayerState } from '../spotify/webPlayer/playerStore.types';

export const usePlayer = () => useContext(SdkContext).player;

export const usePlayerState = <T>(selector: (state: PlayerState) => T): T => {
    return usePlayerStore((state) => selector(state));
};
