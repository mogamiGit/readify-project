export interface GeneralResponseType {
      numFound: number;
      start: number;
      numFoundExact: boolean;
      num_found: number;
      documentation_url: string;
      q: string;
      offset: number | null;
      docs: BookType[];
  }

  export interface BookType {
      author_key?: string[];
      author_name?: string[];
      cover_edition_key?: string;
      cover_i?: number;
      ebook_access: EbookAccess;
      edition_count: number;
      first_publish_year?: number;
      has_fulltext: boolean;
      ia?: string[];
      ia_collection_s?: string;
      key: string;
      language?: string[];
      lending_edition_s?: string;
      lending_identifier_s?: string;
      public_scan_b: boolean;
      title: string;
      subtitle?: string;
  }

  export const EbookAccess = {
      Borrowable: "borrowable",
      NoEbook: "no_ebook",
      Printdisabled: "printdisabled",
  } as const;

  export type EbookAccess = typeof EbookAccess[keyof typeof EbookAccess];  