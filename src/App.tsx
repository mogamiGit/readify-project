import { useState } from 'react'
import '../src/styles/App.css'
import Header from './components/molecules/Header'
import Booklist from './components/organisms/BookList'
import type { LanguageCode } from './types/languages'

export default function App() {
  const [query, setQuery] = useState('the');
  const [type, setType] = useState<'q' | 'author' | 'title'>('q');
  const [language, setLanguage] = useState<LanguageCode>('spa')

  return (
    <div className='w-screen min-h-screen'>
      <Header
        searchValue={setQuery}
        filterType={type}
        setFilterType={setType}
        filterLanguage={language}
        setFilterLanguageType={setLanguage}
      />
      <Booklist query={query} filterType={type} filterLanguage={language} />
    </div>
  )
}
