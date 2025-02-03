export interface Blog {
    id: string;
    title: string;
    description: string;
    author: string;
    date: string;
    image: string; 
    comments: Comment[];
    category: string; 
  }
  
  export interface Comment {
    id: string;
    parentId: string | null; 
    author: string;
    content: string;
    date: string;
    replies: Comment[];
}

  