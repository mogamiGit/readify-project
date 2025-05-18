import React, { useState } from 'react';
import Button from '../atoms/Button';

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
            <form onSubmit={handleSearch} className='bg-white max-w-[30rem] flex justify-between items-center border rounded-full overflow-hidden'>
                  <input
                        type="text"
                        placeholder='Buscar un libro o autor'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className='w-full py-3 px-5 rounded-l-full'
                  />
                  <Button type='submit' text='Buscar' className='rounded-r-full' />
            </form>
      );
}

export default SearchBar;