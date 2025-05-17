import type { GeneralResponseType } from "../types/open-library";
import { OPEN_LIBRARY_SEARCH_URL } from "./endpoints"

export async function getBooks(
      query: string, 
      page: number = 1,
      filterType: 'q' | 'author' | 'title' =  'q'
): Promise<GeneralResponseType> {
      const url = new URL(OPEN_LIBRARY_SEARCH_URL)
      url.searchParams.append(filterType, query)
      url.searchParams.append('page', page.toString())

      const response = await fetch(url.toString())
      if (!response.ok) {
            throw new Error('Error al obtener los libros de Open Library');
      }

      const data: GeneralResponseType = await response.json()
      return data;
}