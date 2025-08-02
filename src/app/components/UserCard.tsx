'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  LinearProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  Badge,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  phone?: string;
  location?: string;
  rating: number;
  tasksCompleted: number;
  totalTasks: number;
}

const sampleUser: User = {
  id: 1,
  name: '田中 太郎',
  email: 'tanaka@example.com',
  role: 'Senior Developer',
  department: 'Engineering',
  status: 'active',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  phone: '090-1234-5678',
  location: '東京',
  rating: 4.5,
  tasksCompleted: 23,
  totalTasks: 30
};

export default function UserCard() {
  const [user, setUser] = useState<User>(sampleUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    status: user.status
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    // 保存処理のシミュレーション
    setTimeout(() => {
      setUser({ ...user, ...editForm });
      setIsEditing(false);
      setIsLoading(false);
      setShowAlert(true);
    }, 1500);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    alert('削除機能はデモ用です');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'アクティブ';
      case 'inactive': return '非アクティブ';
      case 'pending': return '保留中';
      default: return status;
    }
  };

  const completionPercentage = (user.tasksCompleted / user.totalTasks) * 100;

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
          {/* ヘッダー部分 */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: user.status === 'active' ? 'success.main' : 'error.main',
                      border: '2px solid white'
                    }}
                  />
                }
              >
                <Avatar
                  src={user.avatar}
                  sx={{ width: 64, height: 64 }}
                  alt={user.name}
                />
              </Badge>
              <Box>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role}
                </Typography>
                <Chip
                  label={getStatusText(user.status)}
                  color={getStatusColor(user.status) as any}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Tooltip title="お気に入り">
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  color={isFavorite ? 'error' : 'default'}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="その他">
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* 詳細情報 */}
          <Box mb={2}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">{user.email}</Typography>
            </Box>
            {user.phone && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2">{user.phone}</Typography>
              </Box>
            )}
            {user.location && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationIcon fontSize="small" color="action" />
                <Typography variant="body2">{user.location}</Typography>
              </Box>
            )}
            <Box display="flex" alignItems="center" gap={1}>
              <WorkIcon fontSize="small" color="action" />
              <Typography variant="body2">{user.department}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 評価とタスク進捗 */}
          <Box mb={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <StarIcon fontSize="small" color="warning" />
                <Typography variant="body2">評価: {user.rating}/5.0</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {user.tasksCompleted}/{user.totalTasks} タスク完了
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              進捗率: {Math.round(completionPercentage)}%
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box>
            <Tooltip title="編集">
              <IconButton onClick={handleEdit} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="削除">
              <IconButton onClick={handleDelete} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Button variant="outlined" startIcon={<ShareIcon />} sx={{ mr: 1 }}>
              共有
            </Button>
            <Button variant="contained" color="primary">
              詳細
            </Button>
          </Box>
        </CardActions>
      </Card>

      {/* 編集ダイアログ */}
      <Dialog open={isEditing} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>ユーザー情報編集</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="名前"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="メールアドレス"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="役職"
            value={editForm.role}
            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="部署"
            value={editForm.department}
            onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>ステータス</InputLabel>
            <Select
              value={editForm.status}
              label="ステータス"
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
            >
              <MenuItem value="active">アクティブ</MenuItem>
              <MenuItem value="inactive">非アクティブ</MenuItem>
              <MenuItem value="pending">保留中</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>キャンセル</Button>
          <Button onClick={handleSave} variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={20} /> : '保存'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 成功メッセージ */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success">
          ユーザー情報が更新されました！
        </Alert>
      </Snackbar>
    </Box>
  );
}