import React, { useState } from 'react';
import Book from '../molecules/Book';
import ContentWrapper from '../atoms/ContentWrapper';
import SkeletonBook from '../atoms/SkeletonBook';
import type { LanguageCode } from '../../types/languages';
import ControlPageButtons from '../molecules/ControlPageButtons';
import { PAGE_SIZE } from '../../constants/pagination';
import { getCoverUrl } from '../../utils/imageUtils';
import { useBooks } from '../../hooks/useBooks';
import Loading from './Loading';

interface Props {
      query: string;
      filterType: 'q' | 'author' | 'title';
      filterLanguage: LanguageCode;
}

const Booklist: React.FC<Props> = ({ query, filterType, filterLanguage }) => {
      const [page, setPage] = useState<number>(1);
      const { books, loading, error, totalPages } = useBooks({ query, page, filterType, filterLanguage });

      // STATES
      if (loading || error || books.length === 0) {
            let message = '';

            if (loading) message = `Cargando Libros...`;
            else if (error) message = `Error: ❌ ${error}`;
            else if (books.length === 0) message = '😢 No se encontraron libros.';

            return (
                  <div className='relative h-[calc(100vh-80px)] w-screen flex justify-center items-center overflow-y-hidden'>
                        {loading && (
                              <ContentWrapper>
                                    <div className='grid grid-cols-4 gap-x-4 gap-y-10 items-start pt-[550px]'>
                                          {Array.from({ length: PAGE_SIZE }).map((_, i) =>
                                                <SkeletonBook key={i}
                                                />)}
                                    </div>
                              </ContentWrapper>
                        )}
                        <Loading loading={loading} message={message} />
                  </div>
            );
      }

      return (
            <ContentWrapper>
                  <div className='grid grid-cols-4 gap-x-4 gap-y-10 items-start my-12'>
                        {books.map((book) => {
                              const olid = book.cover_i || '';
                              const urlImage = olid ? getCoverUrl(olid) : '';
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