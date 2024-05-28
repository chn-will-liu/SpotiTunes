export type ProgressBarProps = {
    progress?: number;
    onChange?: (progress: number) => void;
    isDraggingChange?: (isDragging: boolean) => void;
};

export const ProgressBar = ({ progress = 0, onChange, isDraggingChange }: ProgressBarProps) => {
    return (
        <div className="text-0 group relative flex-1 items-center gap-4 outline-1 has-[input:focus-visible]:outline ">
            <input
                type="range"
                min="0"
                max="1"
                step={0.001}
                className="block h-6 w-full opacity-0"
                value={progress}
                onChange={(e) => onChange?.(e.currentTarget.valueAsNumber)}
                onPointerDown={() => isDraggingChange?.(true)}
                onPointerUp={() => isDraggingChange?.(false)}
            />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 my-auto h-[6px] select-none rounded-md bg-white bg-opacity-25">
                <div
                    className="h-full rounded-md bg-white group-hover:bg-spotiGreen group-[:focus-within]:bg-spotiGreen"
                    style={{ width: `${progress * 100}%` }}
                ></div>
                <div className="absolute bottom-0 left-1 right-1 top-0 my-auto">
                    <div
                        className="absolute bottom-0 top-0 my-auto hidden h-6 w-[8px] translate-x-[-50%] transform rounded-md
                     bg-white shadow-[0_0_2px_4px_#26262688,0_0_0_2px_#262626f0] group-hover:block group-[:focus-within]:block"
                        style={{ left: `${progress * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
