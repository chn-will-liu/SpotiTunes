export type ProgressBarProps = {
    progress?: number;
    onChange?: (progress: number) => void;
};

export const ProgressBar = (_props: ProgressBarProps) => {
    return (
        <div className="flex flex-1 items-center gap-4">
            <input type="range" min="0" max="100" className="accent-spotiGreen w-full" />
        </div>
    );
};
