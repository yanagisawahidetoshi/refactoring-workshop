'use client';

import { useState } from 'react';
import { Box, Button, Drawer, Typography, IconButton, Avatar } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Person } from '@mui/icons-material';
import { UserInfo } from '../UserInfo';

export const SideMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 300, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">メニュー</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <UserInfo
          name="田中太郎"
          email="tanaka@example.com"
          role="管理者"
        />

        <Box sx={{ mt: 2 }}>
          <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
            ダッシュボード
          </Button>
          <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
            設定
          </Button>
          <Button fullWidth variant="outlined">
            ログアウト
          </Button>
        </Box>
      </Drawer>
    </>
  );
};