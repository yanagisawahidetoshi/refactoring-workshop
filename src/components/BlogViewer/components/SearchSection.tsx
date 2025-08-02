"use client";

import {
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onFilterClick: (event: React.MouseEvent<HTMLElement>) => void;
  onRefresh: () => void;
  totalCount: number;
}

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  onFilterClick,
  onRefresh,
  totalCount,
}: Props) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="投稿を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={onFilterClick}
          >
            フィルター
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
          >
            更新
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {totalCount}件の投稿が見つかりました
        </Typography>
      </CardContent>
    </Card>
  );
}