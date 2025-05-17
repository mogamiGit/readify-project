import React, { useState } from 'react';

interface Props {
      initialValue?: string;
      searchValue: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ initialValue = '', searchValue }) => {
      const [inputValue, setInputValue] = useState(initialValue);

      const handleSearch = (e: React.FormEvent) => {
            e.preventDefault();
            if (inputValue.trim()) {
                  searchValue(inputValue.trim());
            }
      }

      return (
            <form onSubmit={handleSearch} className='bg-white max-w-[30rem] flex justify-between'>
                  <input
                        type="text"
                        placeholder='Buscar un libro o autor'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className='w-full p-3'
                  />
                  <button type='submit' className='bg-amber-900'>Buscar</button>
            </form>
      );
}

export default SearchBar;