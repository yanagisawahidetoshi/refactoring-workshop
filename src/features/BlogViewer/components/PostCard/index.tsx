"use client"

import {
  Comment as CommentIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Share as ShareIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface PostDateInfo {
  formatted: string
  relative: string
  isRecent: boolean
}

interface Props {
  post: Post
  author: User | undefined
  postDateInfo: PostDateInfo
  isFavorite: boolean
  onPostClick: (post: Post) => void
  onFavorite: (postId: number) => void
}

export default function PostCard({
  post,
  author,
  postDateInfo,
  isFavorite,
  onPostClick,
  onFavorite,
}: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ mr: 1 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {author?.name || "Unknown"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{author?.username || "unknown"}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            {postDateInfo.isRecent && <Chip label="新着" color="success" size="small" />}
          </Box>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom>
          {post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.body.substring(0, 100)}...
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <ScheduleIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {postDateInfo.formatted} ({postDateInfo.relative})
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onPostClick(post)}>
          詳細を見る
        </Button>
        <IconButton
          size="small"
          onClick={() => onFavorite(post.id)}
          color={isFavorite ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton size="small">
          <CommentIcon />
        </IconButton>
        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
