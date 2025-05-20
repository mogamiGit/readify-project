import { useState } from 'react'
import '../src/styles/App.css'
import Header from './components/molecules/Header'
import Booklist from './components/organisms/BookList'
import type { LanguageCode } from './types/languages'
import DetailBook from './components/pages/DetailBook'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [query, setQuery] = useState('the');
  const [type, setType] = useState<'q' | 'author' | 'title'>('q');
  const [language, setLanguage] = useState<LanguageCode>('spa')

  return (
    <BrowserRouter>
      <div className='w-screen min-h-screen bg-gradient-to-r from-peach to-blueLight'>
        <Header
          searchValue={setQuery}
          filterType={type}
          setFilterType={setType}
          filterLanguage={language}
          setFilterLanguageType={setLanguage}
        />
        <Routes>
          <Route path="/" element={<Booklist query={query} filterType={type} filterLanguage={language} />} />
          <Route path="/book/:workId" element={<DetailBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
