import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/open-library';
import type { Book } from '../../types/open-library';

const Booklist: React.FC = () => {
      const [books, setBooks] = useState<Book[]>([]);
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
      if (books. length === 0) return <p>No se encontraron libros.</p>
      
      return (
            <div>
                  {books.map((book) => (
                        <div>
                              <p>{book.title}</p>
                        </div>
                  ))}
            </div>
      );
}

export default Booklist;