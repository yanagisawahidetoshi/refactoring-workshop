import { useState } from 'react';
import { Post } from './useBlogData';

export const useBlogUI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleFavorite = (postId: number) => {
    setFavorites(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    filterAnchorEl,
    selectedPost,
    dialogOpen,
    currentPage,
    setCurrentPage,
    snackbarOpen,
    favorites,
    handlePostClick,
    handleFavorite,
    handleFilterClick,
    handleFilterClose,
    handleDialogClose,
    handleSnackbarClose,
    showSnackbar
  };
};