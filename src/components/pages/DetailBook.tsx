import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ContentWrapper from '../atoms/ContentWrapper';
import { getBookDetail } from '../../api/open-library';
import type { BookDetailsApi } from '../../types/book';
import { getCoverUrl, getPlaceholderUrl } from '../../utils/imageUtils';
import Loading from '../organisms/Loading';
import Button from '../atoms/Button';
import { useLocalStorage } from 'usehooks-ts'

function getDescription(book: BookDetailsApi): string | undefined {
      return typeof book.description === "string" ? book.description : book.description?.value
}

const DetailBook: React.FC = () => {
      const { workId } = useParams<{ workId: string }>();

      const navigate = useNavigate();
      const [book, setBook] = useState<BookDetailsApi | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      const [readBooks, setReadBooks] = useLocalStorage<string[]>('readBooks', []);
      const isRead = workId ? readBooks.includes(workId) : false;
      const toggleReadStatus = () => {
            if (!workId) return;

            if (isRead) {
                  setReadBooks(currentIds => currentIds.filter(id => id !== workId));
            } else {
                  setReadBooks(currentIds => [...currentIds, workId]);
            }
      }

      useEffect(() => {
            if (!workId) return;

            let cancelled = false;
            setLoading(true);

            getBookDetail(workId)
                  .then((book) => {
                        if (!cancelled) {
                              console.log('Book data:', book);
                              setBook(book);
                              setError(null);
                        }
                  })
                  .catch((err) => {
                        if (!cancelled) {
                              setError(err.message);
                              setBook(null);
                        }
                  })
                  .finally(() => {
                        if (!cancelled) {
                              setLoading(false);
                        }
                  });

            return () => {
                  cancelled = true;
            };
      }, [workId]);

      if (loading) return (
            <Loading loading={loading} message='Cargando Detalle...' />
      );

      if (error) return (
            <div className='w-full h-screen flex items-center justify-center'>
                  <p className='text-xl text-red-500'>Error: {error}</p>
            </div>
      );

      if (!book) return null;

      const coverUrl = getCoverUrl(book.covers?.[0]);

      return (
            <div className='w-full h-auto flex items-center md:p-8'>
                  <ContentWrapper className='relative bg-white/30 backdrop-blur-sm md:rounded-xl h-full md:h-auto py-4'>
                        <button
                              onClick={() => navigate(-1)}
                              className='absolute left-0 top-0 m-4 py-3 px-6 rounded-full bg-gray-300 border border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300/50 disabled:hover:bg-gray-300 disabled:border-0 hover:scale-110 transition-transform'
                        >
                              ⬅️
                        </button>
                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 items-center py-14'>
                              <div className='flex flex-col gap-4 items-start justify-start text-left p-4 order-2 md:order-1 mt-8 md:mt-0'>
                                    <div className='flex flex-col gap-2'>
                                          <p className='text-3xl font-bold'>{book.title}</p>
                                          {book.first_publish_date && (
                                                <p className='text-sm text-gray-400'>
                                                      Año primera edición: {book.first_publish_date}
                                                </p>
                                          )}
                                    </div>
                                    {book.authors && book.authors.length > 0 && (
                                          <div className='flex flex-col gap-2'>
                                                <p className='text-sm font-semibold'>Autores:</p>
                                                {book.authors.map((author) => (
                                                      <p key={author.author.key} className='text-sm'>
                                                            {author.author.name}
                                                      </p>
                                                ))}
                                          </div>
                                    )}
                                    {book.description && (
                                          <div className='mt-4 w-full'>
                                                <p className='text-sm font-semibold mb-2'>Descripción:</p>
                                                <p className='text-sm text-balance'>            
                                                      {getDescription(book)}
                                                </p>
                                          </div>
                                    )}
                                    <Button
                                          text={isRead ? '✅ Leído' : '📚 No leído'}
                                          style='dark'
                                          onClick={toggleReadStatus}
                                          className={`mt-2 ${isRead
                                                ? 'bg-green-600/60 hover:bg-green-600/40'
                                                : 'bg-gray-400 hover:bg-gray-600'
                                                }`}
                                    />
                              </div>
                              <div className='flex justify-center order-1 md:order-2'>
                                    <img
                                          src={coverUrl || getPlaceholderUrl(book.title)}
                                          alt={`Portada de ${book.title}`}
                                          className='w-auto h-[500px] object-cover rounded-xl bg-blueDark/20'
                                    />
                              </div>
                        </div>
                  </ContentWrapper>
            </div>
      );
}

export default DetailBook;