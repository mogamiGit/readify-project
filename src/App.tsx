import { useState } from 'react'
import '../src/styles/App.css'
import Header from './components/molecules/Header'
import Booklist from './components/organisms/BookList'

export default function App() {
  const [query, setQuery] = useState('the');
  const [type, setType] = useState<'q' | 'author' | 'title'>('q');

  return (
    <div className='w-screen min-h-screen'>
      <Header searchValue={setQuery} filterType={type} setFilterType={setType} />
      <Booklist query={query} filterType={type} />
    </div>
  )
}
