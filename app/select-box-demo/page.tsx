"use client";

import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { SelectBox, SelectOption } from "../components/SelectBox";

const countryOptions: SelectOption[] = [
  { value: "jp", label: "日本" },
  { value: "us", label: "アメリカ" },
  { value: "uk", label: "イギリス" },
  { value: "fr", label: "フランス" },
  { value: "de", label: "ドイツ" },
];

const statusOptions: SelectOption[] = [
  { value: "active", label: "アクティブ" },
  { value: "inactive", label: "非アクティブ" },
  { value: "pending", label: "保留中" },
  { value: "suspended", label: "停止中" },
];

const categoryOptions: SelectOption[] = [
  { value: "tech", label: "テクノロジー" },
  { value: "business", label: "ビジネス" },
  { value: "design", label: "デザイン" },
  { value: "marketing", label: "マーケティング" },
];

export default function SelectBoxDemo() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            基本的な使用例
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <SelectBox
              label="国を選択"
              options={countryOptions}
              value={selectedCountry}
              placeholder="国を選択してください"
              onChange={setSelectedCountry}
            />
            <Typography variant="body2" color="text.secondary">
              選択された値: {selectedCountry || "未選択"}
            </Typography>
          </Box>
        </Paper>

        {/* バリエーション */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            バリエーション
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <SelectBox
              label="ステータス"
              options={statusOptions}
              value={selectedStatus}
              fullWidth
              helperText="ユーザーのステータスを選択してください"
              onChange={setSelectedStatus}
            />

            <SelectBox
              label="カテゴリ"
              options={categoryOptions}
              value={selectedCategory}
              error
              helperText="カテゴリの選択は必須です"
              onChange={setSelectedCategory}
            />

            <SelectBox
              label="無効化されたセレクト"
              options={countryOptions}
              disabled
              helperText="このセレクトは現在使用できません"
            />
          </Box>
        </Paper>

        {/* 選択結果の表示 */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            選択結果
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2">
              <strong>国:</strong> {selectedCountry || "未選択"}
            </Typography>
            <Typography variant="body2">
              <strong>ステータス:</strong> {selectedStatus || "未選択"}
            </Typography>
            <Typography variant="body2">
              <strong>カテゴリ:</strong> {selectedCategory || "未選択"}
            </Typography>
          </Box>
        </Paper>

        {/* 問題点の説明 */}
        <Paper elevation={1} sx={{ p: 3, bgcolor: "warning.light" }}>
          <Typography variant="h6" gutterBottom>
            現在の実装の問題点
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" gutterBottom>
              MUI (Material-UI) に直接依存している
            </Typography>
            <Typography component="li" variant="body2" gutterBottom>
              UIライブラリの変更時に大規模な修正が必要
            </Typography>
            <Typography component="li" variant="body2" gutterBottom>
              再利用性が低く、MUI以外の環境では使用できない
            </Typography>
            <Typography component="li" variant="body2" gutterBottom>
              テストが困難（MUIコンポーネントに依存）
            </Typography>
            <Typography component="li" variant="body2" gutterBottom>
              ビジネスロジックとUI実装が密結合
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
