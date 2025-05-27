import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { DEFAULT_SEARCH_VALUE } from '../../constants/search';

interface Props {
      initialValue?: string;
      searchValue: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ initialValue = '', searchValue }) => {
      const [inputValue, setInputValue] = useState(initialValue);

      useEffect(() => {
            if (inputValue === '') {
                  searchValue(DEFAULT_SEARCH_VALUE);
            }
      }, [inputValue, searchValue]);

      return (
            <div className='bg-white max-w-[30rem] flex justify-between items-center border rounded-full overflow-hidden'>
                  <input
                        type="text"
                        placeholder='Buscar un libro'
                        value={inputValue}
                        onChange={(e) => {
                              setInputValue(e.target.value);
                              if (e.target.value.trim()) {
                                    searchValue(e.target.value.trim());
                              }
                        }}
                        className='w-full py-3 px-5 rounded-l-full'
                  />
                  <Button
                        type='button'
                        text='Buscar'
                        className='rounded-r-full'
                        onClick={() => {
                              if (inputValue.trim()) {
                                    searchValue(inputValue.trim());
                              }
                        }}
                  />
            </div>
      );
}

export default SearchBar;