import { useState } from 'react'
import '../src/styles/App.css'
import Header from './components/molecules/Header'
import Booklist from './components/organisms/BookList'

export default function App() {
  const [query, setQuery] = useState('the');

  return (
    <div className='w-screen min-h-screen'>
      <Header initialValue='' searchValue={setQuery} />
      <Booklist query={query} />
    </div>
  )
}
