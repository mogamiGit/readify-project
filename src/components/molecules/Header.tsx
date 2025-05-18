import React from 'react';
import SearchBar from './SearchBar';
import ContentWrapper from '../atoms/ContentWrapper'

interface Props {
      initialValue?: string;
      searchValue: (value: string) => void;
      filterType: 'q' | 'author' | 'title';
      setFilterType: React.Dispatch<React.SetStateAction<'q' | 'author' | 'title'>>;
}

const Header: React.FC<Props> = ({
      initialValue = '',
      searchValue,
      filterType,
      setFilterType,
}) => {
      return (
            <div className='sticky top-0 w-full p-4 bg-amber-50 border-b-amber-100 z-10'>
                  <ContentWrapper>
                        <div className='flex gap-8 items-center justify-center'>
                              <SearchBar initialValue={initialValue} searchValue={searchValue} />
                              <div>
                                    <label htmlFor="filterSelect" className="mr-2 font-semibold">Buscar por:</label>
                                    <select
                                          id="filterSelect"
                                          value={filterType}
                                          onChange={(e) => setFilterType(e.target.value as 'q' | 'author' | 'title')}
                                          className="p-2 border rounded"
                                    >
                                          <option value="q">Ninguno</option>
                                          <option value="author">Autor</option>
                                          <option value="title">Título</option>
                                    </select>
                              </div>
                        </div>
                  </ContentWrapper>
            </div>
      );
}

export default Header;