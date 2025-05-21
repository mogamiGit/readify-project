import { useEffect, useState } from 'react';
import { getBooks } from '../api/open-library';
import type { BookType } from '../types/open-library';
import { PAGE_SIZE } from '../constants/pagination';
import type { LanguageCode } from '../types/languages';

interface UseBooksParams {
  query: string;
  page: number;
  filterType: 'q' | 'author' | 'title';
  filterLanguage: LanguageCode;
}

export const useBooks = ({
  query,
  page,
  filterType,
  filterLanguage,
}: UseBooksParams) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

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
        if (cancelled) return;

        setBooks(data.docs);
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
  }, [query, page, filterType, filterLanguage]);

  return { books, loading, error, totalPages };
};