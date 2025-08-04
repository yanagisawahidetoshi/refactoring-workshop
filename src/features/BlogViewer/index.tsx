"use client"

import { Add as AddIcon } from "@mui/icons-material"
import {
  Alert,
  Box,
  Container,
  Fab,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Pagination,
  Snackbar,
  Typography,
} from "@mui/material"

import DateInfoCard from "./components/DateInfoCard"
import Header from "./components/Header"
import PostCard from "./components/PostCard"
import PostDialog from "./components/PostDialog"
import SearchSection from "./components/SearchSection"
import { useBlogData } from "./hooks/useBlogData"
import { useBlogFilters } from "./hooks/useBlogFilters"
import { useBlogUI } from "./hooks/useBlogUI"
import { useDateHelpers } from "./hooks/useDateHelpers"

export default function BlogViewer() {
  const { posts, loading, error, refreshPosts, getUserById } = useBlogData()
  const { getPostDateInfo } = useDateHelpers()
  const {
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
    showSnackbar,
  } = useBlogUI()

  const { getPaginatedPosts } = useBlogFilters(posts, searchTerm)

  const { currentPosts, totalPages, totalCount } = getPaginatedPosts(currentPage)

  const handleRefresh = async () => {
    const success = await refreshPosts()
    if (success) {
      showSnackbar()
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography>投稿を読み込み中...</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Box>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <DateInfoCard />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onFilterClick={handleFilterClick}
          onRefresh={handleRefresh}
          totalCount={totalCount}
        />

        {/* 投稿一覧 */}
        <Grid container spacing={3}>
          {currentPosts.map((post) => {
            const author = getUserById(post.userId)
            const postDateInfo = getPostDateInfo(post.id)
            const isFavorite = favorites.includes(post.id)

            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={post.id}>
                <PostCard
                  post={post}
                  author={author}
                  postDateInfo={postDateInfo}
                  isFavorite={isFavorite}
                  onPostClick={handlePostClick}
                  onFavorite={handleFavorite}
                />
              </Grid>
            )
          })}
        </Grid>

        {/* ページネーション */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        )}

        {/* フローティングアクションボタン */}
        <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <AddIcon />
        </Fab>

        {/* フィルターメニュー */}
        <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
          <MenuItem onClick={handleFilterClose}>最新順</MenuItem>
          <MenuItem onClick={handleFilterClose}>人気順</MenuItem>
          <MenuItem onClick={handleFilterClose}>お気に入りのみ</MenuItem>
        </Menu>

        <PostDialog open={dialogOpen} selectedPost={selectedPost} onClose={handleDialogClose} />

        {/* スナックバー */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="投稿一覧を更新しました"
        />
      </Container>
    </Box>
  )
}
