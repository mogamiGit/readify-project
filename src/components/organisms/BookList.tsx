import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/open-library';
import type { BookType } from '../../types/open-library';
import Book from '../molecules/Book';
import { COVER_IMAGE_URL, IMAGE_EXTENSION } from '../../api/endpoints';
import ContentWrapper from '../atoms/ContentWrapper';
import SkeletonBook from '../atoms/SkeletonBook';
import type { LanguageCode } from '../../types/languages';
import ControlPageButtons from '../molecules/ControlPageButtons';

interface Props {
      query: string;
      filterType: 'q' | 'author' | 'title';
      filterLanguage: LanguageCode;
}

const Booklist: React.FC<Props> = ({ query, filterType, filterLanguage }) => {
      const [books, setBooks] = useState<BookType[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      const [page, setPage] = useState<number>(1);
      const [totalPages, setTotalPages] = useState<number>(1);

      useEffect(() => {
            if (!query.trim()) {
                  setBooks([])
                  return;
            }

            async function loadBooks() {
                  try {
                        setLoading(true)
                        setError(null)
                        console.log('Iniciando búsqueda con:', { query, page, filterType, filterLanguage });

                        const data = await getBooks(query, page, filterType, filterLanguage, 12);
                        console.log('Respuesta de la API:', data);

                        setBooks(data.docs)
                        setTotalPages(Math.ceil(data.numFound / 12)) // En base a 12
                  } catch (err) {
                        console.error('Error completo:', err);
                        setError((err as Error).message)
                  } finally {
                        setLoading(false)
                  }
            }

            loadBooks();
      }, [query, filterType, filterLanguage, page])

      // STATES
      if (loading || error || books.length === 0) {
            let message = '';

            if (loading) message = `Cargando Libros...`;
            else if (error) message = `Error: ❌ ${error}`;
            else if (books.length === 0) message = '😢 No se encontraron libros.';

            return (
                  <div className='relative h-[calc(100vh-80px)] w-screen flex justify-center items-center overflow-y-hidden'>
                        {loading && (
                              <ContentWrapper className="pt-[300px]">
                                    <div className='grid grid-cols-4 gap-x-4 gap-y-10 items-start'>
                                          {Array.from({ length: 12 }).map((_, i) => <SkeletonBook key={i} />)}
                                    </div>
                              </ContentWrapper>
                        )}
                        <div className='absolute inset-0 w-screen h-screen bg-gradient-to-r from-peach to-blueLight p-4 flex items-center justify-center'>
                              <div className='rounded-full px-10 py-6 bg-white shadow-3xl'>
                                    <p className={`text-lg ${loading ? 'animate-pulse' : ''} `}>{message}</p>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <ContentWrapper>
                  <div className='grid grid-cols-4 gap-x-4 gap-y-10 items-start my-12'>
                        {books.map((book) => {
                              const olid = book.cover_i || '';
                              const urlImage = olid ? `${COVER_IMAGE_URL}${olid}-L${IMAGE_EXTENSION}` : '';
                              const workId = book.key?.split('/').pop();

                              return (
                                    <Book
                                          title={book.title}
                                          authors={book.author_name ?? []}
                                          urlImage={urlImage}
                                          workId={workId}
                                    />
                              );
                        })}
                  </div>

                  <ControlPageButtons
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                  />
            </ContentWrapper>
      );
}

export default Booklist;