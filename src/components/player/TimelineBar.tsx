import { useMemo, useState } from 'react';
import { useFormatter } from '../../hooks/useFormatter';
import { usePlayer, usePlayerState } from '../../hooks/usePlayer';
import { ProgressBar } from '../ProgressBar';

export const TimelineBar = () => {
    const player = usePlayer();
    const formatter = useFormatter();
    const position = usePlayerState((state) => state.position);
    const totalDuration = usePlayerState((state) => state.totalDuration);

    const [draggingPosition, setDraggingPosition] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const totalDurationStr = useMemo(
        () => formatter.formatDuration(totalDuration),
        [totalDuration, formatter]
    );
    const currentPosition = draggingPosition ?? position;
    const currentTime = formatter.formatDuration(currentPosition * totalDuration);

    return (
        <div className="flex items-center gap-2">
            <div className="w-8 text-right font-mono text-sm text-white text-opacity-65">
                {currentTime}
            </div>
            <div className="flex-1">
                <ProgressBar
                    progress={currentPosition}
                    onChange={(position) => {
                        if (!isDragging) {
                            player.seek(position);
                        } else {
                            setDraggingPosition(position);
                        }
                    }}
                    isDraggingChange={(value) => {
                        setIsDragging(value);
                        if (!value) {
                            player.seek(draggingPosition ?? position);
                            setDraggingPosition(null);
                        }
                    }}
                />
            </div>
            <div className="w-8 text-left font-mono text-sm text-white text-opacity-65">
                {totalDurationStr}
            </div>
        </div>
    );
};
