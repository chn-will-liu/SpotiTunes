import { useState } from 'react';

export type ProgressBarProps = {
    progress?: number;
    onChange?: (progress: number) => void;
};

export const ProgressBar = (props: ProgressBarProps) => {
    const [progress, setProgress] = useState(props.progress ?? 0);
    return (
        <div className="text-0 group relative flex-1 items-center gap-4 outline-1 has-[input:focus-visible]:outline ">
            <input
                type="range"
                min="0"
                max="100"
                step={0.1}
                className="block h-6 w-full opacity-0"
                onChange={(e) => setProgress(e.currentTarget.valueAsNumber)}
            />
            <div className="pointer-events-none absolute bottom-0 left-2 right-2 top-0 my-auto h-[6px] select-none rounded-md bg-white bg-opacity-25">
                <div
                    className="group-hover:bg-spotiGreen group-[:focus-within]:bg-spotiGreen h-full rounded-md bg-white"
                    style={{ width: `${progress}%` }}
                ></div>
                <div
                    className="absolute bottom-0 top-0 my-auto hidden h-6 w-[8px] translate-x-[-50%] transform rounded-md
                     bg-white shadow-[0_0_2px_4px_#26262688,0_0_0_2px_#262626f0] group-hover:block group-[:focus-within]:block"
                    style={{ left: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};
