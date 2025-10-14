"use client";

import { Box, Container, Typography } from "@mui/material";
import { ButtonGroup } from "../components/ButtonGroup";

export default function ButtonGroupDemo() {
  const handleSave = () => console.log("保存しました");
  const handleCancel = () => console.log("キャンセルしました");
  const handleDelete = () => console.log("削除しました");

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            保存・キャンセルボタン
          </Typography>
          <ButtonGroup
            primaryText="保存"
            primaryOnClick={handleSave}
            primaryVariant="contained"
            primaryColor="primary"
            secondaryText="キャンセル"
            secondaryOnClick={handleCancel}
            secondaryVariant="outlined"
            secondaryColor="primary"
          />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            削除・キャンセルボタン
          </Typography>
          <ButtonGroup
            primaryText="削除"
            primaryOnClick={handleDelete}
            primaryVariant="contained"
            primaryColor="error"
            secondaryText="キャンセル"
            secondaryOnClick={handleCancel}
            secondaryVariant="outlined"
            secondaryColor="error"
          />
        </Box>
      </Box>
    </Container>
  );
}
