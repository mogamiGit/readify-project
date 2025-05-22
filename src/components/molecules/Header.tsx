import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ContentWrapper from '../atoms/ContentWrapper';
import type { FilterType } from '../../types/filters';
import type { FilterLanguageCodeType } from '../../types/filters';
import Button from '../atoms/Button';
import type { FilterIsReadType } from '../../types/filters';


interface Props {
      initialValue?: string;
      searchValue: (value: string) => void;
      filterType: FilterType;
      setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
      filterLanguage: FilterLanguageCodeType;
      setFilterLanguageType: React.Dispatch<React.SetStateAction<FilterLanguageCodeType>>;
      filterIsRead: FilterIsReadType;
      setFilterIsRead: React.Dispatch<React.SetStateAction<FilterIsReadType>>;
}

const Header: React.FC<Props> = ({
      initialValue = '',
      searchValue,
      filterType,
      setFilterType,
      filterLanguage,
      setFilterLanguageType,
      filterIsRead,
      setFilterIsRead,
}) => {
      const [menuOpen, setMenuOpen] = useState(false);

      const headerClass =
            'sticky top-0 w-full p-4 bg-gradient-to-r from-blueLight to-peach border-2 border-b-blueLight z-10 backdrop-blur-lg';
      const selectClass = 'min-w-[150px] mx-4 my-1 p-4 border rounded-full w-[calc(100%-2rem)] md:w-auto md:mx-0'
      const menuClass = 'absolute top-full right-0 mt-2 w-48 rounded shadow-lg py-2 transition-all duration-200 lg:static lg:mt-0 lg:w-auto lg:bg-opacity-100 lg:shadow-none lg:flex lg:gap-4 lg:py-0'

      return (
            <div className={headerClass}>
                  <ContentWrapper>
                        <div className="flex items-center justify-between relative">
                              <SearchBar initialValue={initialValue} searchValue={searchValue} />
                              <Button
                                    text={menuOpen ? '✖️' : '➕'}
                                    style='light'
                                    onClick={() => setMenuOpen((o) => !o)}
                                    className="lg:hidden focus:outline-none"
                                    aria-label="Abrir filtros"
                              />
                              <div
                                    className={`${menuOpen ? 'block bg-white bg-opacity-90 backdrop-blur-sm border' : 'hidden items-center'} ${menuClass}`}
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
                                          <option value="q">Todos</option>
                                          <option value="author">Autor</option>
                                          <option value="title">Título</option>
                                    </select>
                                    <select
                                          id="filterLanguage"
                                          value={filterLanguage}
                                          onChange={(e) =>
                                                setFilterLanguageType(e.target.value as FilterLanguageCodeType)
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
                                    <select
                                          id="filterIsRead"
                                          value={filterIsRead}
                                          onChange={(e) =>
                                                setFilterIsRead(e.target.value as FilterIsReadType)
                                          }
                                          className={selectClass}
                                    >
                                          <option value="" disabled>
                                                Leidos
                                          </option>
                                          <option value="none">Ver todos</option>
                                          <option value="true">Ver leidos</option>
                                          <option value="false">Ver no leidos</option>
                                    </select>
                              </div>
                        </div>
                  </ContentWrapper>
            </div>
      );
};

export default Header;