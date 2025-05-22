import { useEffect, useState } from 'react';
import { getBooks } from '../api/open-library';
import type { BookType } from '../types/open-library';
import { PAGE_SIZE } from '../constants/pagination';
import type { FilterLanguageCodeType } from '../types/filters';
import { useLocalStorage } from 'usehooks-ts';
import type { FilterIsReadType } from '../types/filters';

interface UseBooksParams {
  query: string;
  page: number;
  filterType: 'q' | 'author' | 'title';
  filterLanguage: FilterLanguageCodeType;
  filterIsRead: FilterIsReadType;
}

export const useBooks = ({
  query,
  page,
  filterType,
  filterLanguage,
  filterIsRead,
}: UseBooksParams) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [readBooks] = useLocalStorage<string[]>('readBooks', []);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await getBooks(query, page, filterType, filterLanguage, PAGE_SIZE);
        let books = data.docs
        
        if(filterIsRead != "none")  {
          books = books.filter((book) => {
             const workId = book.key?.split('/').pop()
             const isRead = workId ? readBooks.includes(workId) : false;
             return isRead == (filterIsRead == "true" )
           })
        }
        if (cancelled) return;

        setBooks(books);
        setTotalPages(Math.max(1, Math.ceil(data.numFound / PAGE_SIZE)));
        setError(null);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query, page, filterType, filterLanguage, filterIsRead, readBooks]);

  return { books, loading, error, totalPages };
};