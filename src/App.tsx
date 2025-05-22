import { useState } from 'react'
import '../src/styles/App.css'
import Header from './components/molecules/Header'
import Booklist from './components/organisms/BookList'
import type { FilterType } from './types/filters'
import type { FilterLanguageCodeType } from './types/filters'
import DetailBook from './components/pages/DetailBook'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { FilterIsReadType } from './types/filters'

export default function App() {
  const [query, setQuery] = useState('the');
  const [filterType, setFilterType] = useState<FilterType>('q');
  const [filterIsRead, setFilterIsRead] = useState<FilterIsReadType>("none");
  const [filterLanguage, setFilterLanguage] = useState<FilterLanguageCodeType>('spa')

  return (
    <BrowserRouter>
      <div className='w-screen min-h-screen bg-gradient-to-r from-peach to-blueLight'>
        <Header
          searchValue={setQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          filterLanguage={filterLanguage}
          setFilterLanguageType={setFilterLanguage}
          filterIsRead={filterIsRead}
          setFilterIsRead={setFilterIsRead}
        />
        <Routes>
          <Route path="/" element={
            <Booklist
              query={query}
              filterType={filterType}
              filterLanguage={filterLanguage}
              filterIsRead={filterIsRead}
            />
          }
          />
          <Route path="/book/:workId" element={<DetailBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
