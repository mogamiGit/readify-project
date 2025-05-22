import React, { useState } from 'react';
import Book from '../molecules/Book';
import ContentWrapper from '../atoms/ContentWrapper';
import SkeletonBook from '../atoms/SkeletonBook';
import type { FilterType } from '../../types/filters';
import type { FilterLanguageCodeType } from '../../types/filters';
import ControlPageButtons from '../molecules/ControlPageButtons';
import { PAGE_SIZE } from '../../constants/pagination';
import { getCoverUrl } from '../../utils/imageUtils';
import { useBooks } from '../../hooks/useBooks';
import Loading from './Loading';
import type { FilterIsReadType } from '../../types/filters';

interface Props {
      query: string;
      filterType: FilterType;
      filterLanguage: FilterLanguageCodeType;
      filterIsRead: FilterIsReadType;
}

const Booklist: React.FC<Props> = ({ query, filterType, filterLanguage, filterIsRead }) => {
      const [page, setPage] = useState<number>(1);
      const { books, loading, error, totalPages } = useBooks({ query, page, filterType, filterLanguage, filterIsRead });

      const gridClass = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 items-start my-12'

      if (loading || error || books.length === 0) {
            let message = '';

            if (loading) message = `Cargando Libros...`;
            else if (error) message = `Error: ❌ ${error}`;
            else if (books.length === 0) message = '😢 No se encontraron libros.';

            return (
                  <div className='relative h-[calc(100vh-80px)] w-screen flex justify-center items-center overflow-y-hidden'>
                        {loading && (
                              <ContentWrapper>
                                    <div className={`${gridClass} pt-0 md:pt-[550px]`}>
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
                  <div className={`${gridClass} my-12`}>
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