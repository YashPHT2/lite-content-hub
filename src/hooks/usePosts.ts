import { useState, useEffect } from 'react';
import { Post, PostFormData } from '../types/post';

const STORAGE_KEY = 'cms-posts';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error loading posts from localStorage:', error);
      }
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const createPost = (formData: PostFormData) => {
    const newPost: Post = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, formData: PostFormData) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...formData, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
    getPostById,
  };
};