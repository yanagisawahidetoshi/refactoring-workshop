import { useMemo } from 'react';
import { Post } from './useBlogData';

export const useBlogFilters = (posts: Post[], searchTerm: string) => {
  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const getPaginatedPosts = (currentPage: number, postsPerPage: number = 6) => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    );
    
    return {
      currentPosts,
      totalPages,
      totalCount: filteredPosts.length
    };
  };

  return {
    filteredPosts,
    getPaginatedPosts
  };
};