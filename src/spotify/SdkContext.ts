import { createContext } from 'react';
import { SpotifySdk } from './SpotifySdk';

export const SdkContext = createContext<SpotifySdk>({} as SpotifySdk);
