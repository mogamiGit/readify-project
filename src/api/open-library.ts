import type { GeneralResponseType } from "../types/open-library";
import { OPEN_LIBRARY_SEARCH_URL } from "./endpoints";
import type { FilterLanguageCodeType } from '../types/filters';
import type { BookDetailsApi } from '../types/book';

export async function getBooks(
      query: string, 
      page: number = 1,
      filterType: 'q' | 'author' | 'title' =  'q',
      language?: FilterLanguageCodeType,
      limit: number = 12,
): Promise<GeneralResponseType> {
      const url = new URL(OPEN_LIBRARY_SEARCH_URL)
      url.searchParams.append(filterType, query)
      url.searchParams.append('page', page.toString())
      url.searchParams.append('limit', limit.toString())

      if (language) {
            url.searchParams.append('language', language)
            console.log('[getBooks] URL final:', url.toString());
      }

      const response = await fetch(url.toString())
      if (!response.ok) {
            throw new Error('Error al obtener los libros de Open Library');
      }

      const data: GeneralResponseType = await response.json()
      return data;
}


export const getBookDetail = async (workId: string): Promise<BookDetailsApi> => {
  const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
  if (!res.ok) {
    throw new Error('Error al cargar el libro');
  }
  const data = await res.json();
  
  if (data.authors && data.authors.length > 0) {
    const authorPromises = data.authors.map(async (author: { author: { key: string } }) => {
      const authorRes = await fetch(`https://openlibrary.org${author.author.key}.json`);
      if (!authorRes.ok) {
        throw new Error('Error al cargar los detalles del autor');
      }
      const authorData = await authorRes.json();
      return {
        author: {
          key: author.author.key,
          name: authorData.name
        }
      };
    });
    
    data.authors = await Promise.all(authorPromises);
  }
  
  return data;
};