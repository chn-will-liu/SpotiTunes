import { TbMusicSearch } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { NavList } from '../../components/NavList';
import { SearchResult, SearchResultProps } from '../../components/search/SearchResult';
import { SearchBox } from '../../components/SearchBox';

const SearchTypeNav = () => {
    const { searchText } = useParams<{ searchText: string }>();

    const links = [
        { label: 'All', to: `/search/${searchText}` },
        { label: 'Songs', to: `/search/${searchText}/track` },
        { label: 'Artists', to: `/search/${searchText}/artist` },
        { label: 'Albums', to: `/search/${searchText}/album` },
        { label: 'Playlists', to: `/search/${searchText}/playlist` },
    ];

    return <NavList links={links} />;
};

export const PageSearch = () => {
    const navigate = useNavigate();

    const { searchText, searchType } = useParams<{ searchText: string; searchType: string }>();

    const handleSearch = (input: string) => {
        if (input !== searchText) {
            const text = searchType ? input.padEnd(1, ' ') : input;
            navigate(`/${['search', text, searchType].filter(Boolean).join('/')}`, {
                replace: true,
            });
        }
    };

    const searchTypeAll: SearchResultProps['searchType'] = ['album', 'artist', 'playlist', 'track'];
    let searchTypeToUse = searchTypeAll;
    if (searchTypeAll.some((type) => type === searchType)) {
        searchTypeToUse = [searchType] as unknown as typeof searchTypeAll;
    }

    return (
        <div
            className={searchText ? '' : 'flex h-full flex-col-reverse items-center justify-center'}
        >
            <div className={`${searchText ? 'my-8 ml-6 mr-2' : ''} w-[512px]`}>
                <SearchBox
                    value={searchText ?? ''}
                    onChange={handleSearch}
                    placeholder="what do you want to play?"
                />
            </div>
            {searchText && (
                <>
                    <SearchTypeNav />
                    <SearchResult
                        searchText={searchText}
                        displayMode={searchTypeToUse.length === 1 ? 'all' : 'top-items'}
                        searchType={searchTypeToUse}
                        className="m-2"
                    />
                </>
            )}
            {!searchText && <TbMusicSearch className="mb-4 h-40 w-40" />}
        </div>
    );
};

export const Component = PageSearch;
