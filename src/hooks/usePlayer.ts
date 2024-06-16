import { useContext } from 'react';
import { SdkContext } from '../Spotify/SdkContext';
import { usePlayerStore } from '../Spotify/WebPlayer/playerStore';
import { PlayerState } from '../Spotify/WebPlayer/types';

export const usePlayer = () => {
    const { player } = useContext(SdkContext);
    return player;
};

export const usePlayerState = <T>(selector: (state: PlayerState) => T): T => {
    return usePlayerStore((state) => selector(state));
};
