import { TbError404 } from 'react-icons/tb';

export const ErrorNotFound = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <TbError404 className="h-40 w-40" />
            <p className="text-lg">The page you are looking for does not exist.</p>
        </div>
    );
};

export const Component = ErrorNotFound;
