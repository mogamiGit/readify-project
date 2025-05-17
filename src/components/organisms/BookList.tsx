import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/open-library';
import type { BookType } from '../../types/open-library';
import Book from '../molecules/Book';
import { COVER_IMAGE_URL, IMAGE_EXTENSION } from '../../api/endpoints';

const Booklist: React.FC = () => {
      const [books, setBooks] = useState<BookType[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            async function loadBooks() {
                  try {
                        setLoading(true)
                        const data = await getBooks('dune', 1);
                        setBooks(data.docs.slice(0, 10))
                  } catch (err) {
                        setError((err as Error).message)
                  } finally {
                        setLoading(false)
                  }
            }

            loadBooks();
      }, [])

      if (loading) return <p>Cargando Libros...</p>
      if (error) return <p>Error: {error}</p>
      if (books.length === 0) return <p>No se encontraron libros.</p>

      return (
            <div className='grid grid-cols-4 gap-4 items-start'>
                  {books.map((book) => {
                        const olid = book.cover_i || '';
                        const urlImage = olid ? `${COVER_IMAGE_URL}${olid}-M${IMAGE_EXTENSION}` : '';

                        return (
                              <Book
                                    title={book.title}
                                    authors={book.author_name ?? []}
                                    urlImage={urlImage}
                              />
                        );
                  })}
            </div>
      );
}

export default Booklist;