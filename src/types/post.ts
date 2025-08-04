export interface Post {
  id: string;
  title: string;
  description: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormData {
  title: string;
  description: string;
  tag?: string;
}