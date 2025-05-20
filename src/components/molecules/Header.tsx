import React from 'react';
import SearchBar from './SearchBar';
import ContentWrapper from '../atoms/ContentWrapper'
import type { LanguageCode } from '../../types/languages';

interface Props {
      initialValue?: string;
      searchValue: (value: string) => void;
      filterType: 'q' | 'author' | 'title';
      setFilterType: React.Dispatch<React.SetStateAction<'q' | 'author' | 'title'>>;
      filterLanguage: LanguageCode;
      setFilterLanguageType: React.Dispatch<React.SetStateAction<LanguageCode>>;
}

const Header: React.FC<Props> = ({
      initialValue = '',
      searchValue,
      filterType,
      setFilterType,
      filterLanguage,
      setFilterLanguageType,
}) => {
      const headerClass = 'sticky top-0 w-full p-4 bg-gradient-to-r from-blueLight to-peach border-2 border-b-blueLight z-10 backdrop-blur-lg'

      return (
            <div className={headerClass}>
                  <ContentWrapper>
                        <div className='flex gap-8 items-center justify-between'>
                              <SearchBar initialValue={initialValue} searchValue={searchValue} />
                              <div className='flex gap-4 items-center'>
                                    <label htmlFor="filterType" className="mr-2 font-semibold">Buscar por:</label>
                                    <select
                                          id="filterType"
                                          value={filterType}
                                          onChange={(e) => setFilterType(e.target.value as 'q' | 'author' | 'title')}
                                          className="p-4 border rounded-full"
                                    >
                                          <option value="" disabled>🔍 Filtrar por</option>
                                          <option value="q">Ninguno</option>
                                          <option value="author">Autor</option>
                                          <option value="title">Título</option>
                                    </select>
                                    <select
                                          id="filterLanguage"
                                          value={filterLanguage}
                                          onChange={(e) => setFilterLanguageType(e.target.value as LanguageCode)}
                                          className="p-4 border rounded-full"
                                    >
                                          <option value="" disabled>Idioma</option>
                                          <option value="eng">🇺🇸 English</option>
                                          <option value="spa">🇪🇸 Español</option>
                                          <option value="fre">🇫🇷 Français</option>
                                    </select>
                              </div>
                        </div>
                  </ContentWrapper >
            </div >
      );
}

export default Header;