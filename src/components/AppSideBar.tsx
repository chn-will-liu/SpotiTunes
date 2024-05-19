import { GrFavorite } from 'react-icons/gr';
import { IconButton } from './IconButton';

export const AppSideBar = () => {
    return (
        <div className="w-[98px] border-l border-white border-opacity-25">
            <IconButton icon={GrFavorite} size="xl" />
        </div>
    );
};
