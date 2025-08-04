"use client"

import { Notifications as NotificationsIcon } from "@mui/icons-material"
import { AppBar, Badge, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          📝 ブログビューア
        </Typography>
        <Tooltip title="通知">
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Button color="inherit">ログイン</Button>
      </Toolbar>
    </AppBar>
  )
}
