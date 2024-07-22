export const transformSpotifyURI = (href: string | undefined) => {
    const [spotify, type, id] = href?.split(':') ?? [];

    if (spotify !== 'spotify' || !type || !id) {
        return null;
    }

    switch (type) {
        case 'track':
            return `/track/${id}`;
        case 'album':
            return `/album/${id}`;
        case 'artist':
            return `/artist/${id}`;
        case 'playlist':
            return `/playlist/${id}`;
        default:
            return null;
    }
};
