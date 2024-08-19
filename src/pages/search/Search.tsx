import { useCallback } from 'react';
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

    const handleSearch = useCallback(
        (newSearchText: string) => {
            if (newSearchText !== searchText) {
                navigate(`/search/${encodeURIComponent(newSearchText)}`, {
                    replace: true,
                });
            }
        },
        [searchText, navigate]
    );

    const searchTypeAll: SearchResultProps['searchType'] = ['album', 'artist', 'playlist', 'track'];
    let searchTypeToUse = searchTypeAll;
    if (searchTypeAll.some((type) => type === searchType)) {
        searchTypeToUse = [searchType] as unknown as typeof searchTypeAll;
    }

    return (
        <>
            <div className="my-8 ml-6 mr-2 max-w-lg">
                <SearchBox
                    placeholder="What do you want to play?"
                    value={searchText ?? ''}
                    onChange={handleSearch}
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
        </>
    );
};

export const Component = PageSearch;
