import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ContentWrapper from '../atoms/ContentWrapper';

interface BookDetails {
      title: string;
      description?: string;
      first_publish_date?: string;
      authors?: Array<{
            author: {
                  key: string;
                  name: string;
            }
      }>;
      covers?: number[];
}

const DetailBook: React.FC = () => {
      const { workId } = useParams<{ workId: string }>();
      const [book, setBook] = useState<BookDetails | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            if (!workId) return;

            setLoading(true);
            fetch(`https://openlibrary.org/works/${workId}.json`)
                  .then(res => {
                        if (!res.ok) throw new Error('Error al cargar el libro');
                        return res.json();
                  })
                  .then(data => {
                        setBook(data);
                        setLoading(false);
                  })
                  .catch(err => {
                        setError(err.message);
                        setLoading(false);
                  });
      }, [workId]);

      if (loading) return (
            <div className='w-full h-screen flex items-center justify-center'>
                  <p className='text-xl'>Cargando...</p>
            </div>
      );

      if (error) return (
            <div className='w-full h-screen flex items-center justify-center'>
                  <p className='text-xl text-red-500'>Error: {error}</p>
            </div>
      );

      if (!book) return null;

      const coverUrl = book.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
            : '';

      return (
            <div className='w-full h-screen flex items-center'>
                  <ContentWrapper className='bg-white/30 backdrop-blur-sm rounded-xl'>
                        <div className='w-full h-full grid grid-cols-2 items-center py-14'>
                              <div className='flex flex-col gap-4 items-start justify-start text-left p-4'>
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
                                          <div className='mt-4'>
                                                <p className='text-sm font-semibold mb-2'>Descripción:</p>
                                                <p className='text-sm'>{book.description}</p>
                                          </div>
                                    )}
                              </div>
                              <div className='flex justify-center'>
                                    {coverUrl ? (
                                          <img
                                                src={coverUrl}
                                                alt={`Portada de ${book.title}`}
                                                className='w-[350px] h-[500px] object-cover rounded-xl shadow-lg'
                                          />
                                    ) : (
                                          <div className='w-[400px] h-[600px] bg-gray-400 rounded-xl flex items-center justify-center'>
                                                <p className='text-gray-600'>Sin portada disponible</p>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </ContentWrapper>
            </div>
      );
}

export default DetailBook;