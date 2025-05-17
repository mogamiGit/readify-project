import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/open-library';
import type { BookType } from '../../types/open-library';
import Book from '../molecules/Book';
import { COVER_IMAGE_URL, IMAGE_EXTENSION } from '../../api/endpoints';
import ContentWrapper from '../atoms/ContentWrapper';

interface Props {
      query: string;
      filterType: 'q' | 'author' | 'title'
}

const Booklist: React.FC<Props> = ({ query, filterType }) => {
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
                        setError(null)
                        const data = await getBooks(query, 1, filterType);

                        setBooks(data.docs.slice(0, 12))
                  } catch (err) {
                        setError((err as Error).message)
                  } finally {
                        setLoading(false)
                  }
            }

            loadBooks();
      }, [query, filterType])

      if (loading || error || books.length === 0) {
            let message = '';

            if (loading) message = 'Cargando Libros...';
            else if (error) message = `Error: ${error}`;
            else if (books.length === 0) message = 'No se encontraron libros.';

            return (
                  <div className='h-[calc(100vh-80px)] w-screen flex justify-center items-center'>
                        <p className='text-lg'>{message}</p>
                  </div>
            );
      }

      return (
            <ContentWrapper>
                  <div className='grid grid-cols-4 gap-x-4 gap-y-10 items-start my-12'>
                        {books.map((book) => {
                              const olid = book.cover_i || '';
                              const urlImage = olid ? `${COVER_IMAGE_URL}${olid}-L${IMAGE_EXTENSION}` : '';

                              return (
                                    <Book
                                          title={book.title}
                                          authors={book.author_name ?? []}
                                          urlImage={urlImage}
                                    />
                              );
                        })}
                  </div>
            </ContentWrapper>
      );
}

export default Booklist;