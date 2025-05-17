import React from 'react';
import SearchBar from './SearchBar';

interface Props {
      initialValue?: string;
      searchValue: (value: string) => void;
}

const Header: React.FC<Props> = ({ initialValue = '', searchValue }) => {
      return (
            <div className='sticky top-0 w-full p-4 bg-amber-50 border-b-amber-100'>
                  <SearchBar initialValue={initialValue} searchValue={searchValue} />
            </div>
      );
}

export default Header;