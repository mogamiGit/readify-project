import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/open-library';
import type { BookType } from '../../types/open-library';
import Book from '../molecules/Book';
import { COVER_IMAGE_URL, IMAGE_EXTENSION } from '../../api/endpoints';

interface Props {
      query: string;
}

const Booklist: React.FC<Props> = ({ query }) => {
      const [books, setBooks] = useState<BookType[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            if (!query) {
                  setBooks([])
                  return;
            }

            async function loadBooks() {
                  try {
                        setLoading(true)
                        const data = await getBooks(query, 1);
                        setBooks(data.docs.slice(0, 12))
                  } catch (err) {
                        setError((err as Error).message)
                  } finally {
                        setLoading(false)
                  }
            }

            loadBooks();
      }, [query])

      if (loading) return <p>Cargando Libros...</p>
      if (error) return <p>Error: {error}</p>
      if (books.length === 0) return <p>No se encontraron libros.</p>

      return (
            <div>
                  <div className='grid grid-cols-4 gap-x-4 gap-y-10 items-start'>
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
            </div>
      );
}

export default Booklist;