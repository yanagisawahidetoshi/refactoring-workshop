"use client"

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import { useDateHelpers } from "../../hooks/useDateHelpers"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Props {
  open: boolean
  selectedPost: Post | null
  onClose: () => void
}

export default function PostDialog({ open, selectedPost, onClose }: Props) {
  const { getPostDateInfo } = useDateHelpers()

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {selectedPost && (
        <>
          <DialogTitle>{selectedPost.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedPost.body}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                投稿日: {getPostDateInfo(selectedPost.id).formatted}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>閉じる</Button>
            <Button variant="contained">コメントする</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
