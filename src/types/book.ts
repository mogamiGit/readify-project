export interface AuthorApi {
      author: { key: string; name: string };
}
    
export interface BookDetailsApi {
      title: string;
      description?: string;
      first_publish_date?: string;
      authors?: AuthorApi[];
      covers?: number[];
}
    