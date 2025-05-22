import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ContentWrapper from '../atoms/ContentWrapper';
import type { LanguageCode } from '../../types/languages';
import Button from '../atoms/Button';

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
      const [menuOpen, setMenuOpen] = useState(false);
      const headerClass =
            'sticky top-0 w-full p-4 bg-gradient-to-r from-blueLight to-peach border-2 border-b-blueLight z-10 backdrop-blur-lg';
      const selectClass = 'mx-4 my-1 p-4 border rounded-full w-[calc(100%-2rem)] md:w-auto md:mx-0'

      return (
            <div className={headerClass}>
                  <ContentWrapper>
                        <div className="flex items-center justify-between relative">
                              <SearchBar initialValue={initialValue} searchValue={searchValue} />
                              <Button
                                    text={menuOpen ? '✖️' : '➕'}
                                    style='light'
                                    onClick={() => setMenuOpen((o) => !o)}
                                    className="md:hidden focus:outline-none"
                                    aria-label="Abrir filtros"
                              />
                              <div
                                    className={`${menuOpen ? 'block bg-white bg-opacity-90 backdrop-blur-sm border' : 'hidden items-center'} absolute top-full right-0 mt-2 w-48 rounded shadow-lg py-2 transition-all duration-200 md:static md:mt-0 md:w-auto md:bg-opacity-100 md:shadow-none md:flex md:gap-4 md:py-0`}
                              >
                                    <label htmlFor="filterType" className="font-semibold block md:inline-block">
                                          Buscar por:
                                    </label>
                                    <select
                                          id="filterType"
                                          value={filterType}
                                          onChange={(e) =>
                                                setFilterType(e.target.value as 'q' | 'author' | 'title')
                                          }
                                          className={selectClass}
                                    >
                                          <option value="" disabled>
                                                🔍 Filtrar por
                                          </option>
                                          <option value="q">Ninguno</option>
                                          <option value="author">Autor</option>
                                          <option value="title">Título</option>
                                    </select>
                                    <select
                                          id="filterLanguage"
                                          value={filterLanguage}
                                          onChange={(e) =>
                                                setFilterLanguageType(e.target.value as LanguageCode)
                                          }
                                          className={selectClass}
                                    >
                                          <option value="" disabled>
                                                Idioma
                                          </option>
                                          <option value="eng">🇺🇸 English</option>
                                          <option value="spa">🇪🇸 Español</option>
                                          <option value="fre">🇫🇷 Français</option>
                                    </select>
                              </div>
                        </div>
                  </ContentWrapper>
            </div>
      );
};

export default Header;