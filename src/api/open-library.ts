import type { GeneralResponseType } from "../types/open-library";
import { OPEN_LIBRARY_SEARCH_URL } from "./endpoints";
import type { LanguageCode } from '../types/languages';
import type { BookDetailsApi } from '../types/book';

export async function getBooks(
      query: string, 
      page: number = 1,
      filterType: 'q' | 'author' | 'title' =  'q',
      language?: LanguageCode,
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
  return res.json();
};