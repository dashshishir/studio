export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown content
  author: string;
  publishedDate: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}
