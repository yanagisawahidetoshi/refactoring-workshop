"use client";

import { Schedule as ScheduleIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useDateHelpers } from "../../hooks/useDateHelpers";

export default function DateInfoCard() {
  const { getDateInfo } = useDateHelpers();
  const dateInfo = getDateInfo();

  return (
    <Card sx={{ mb: 3, backgroundColor: "primary.main", color: "white" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {dateInfo.today}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ScheduleIcon />
              <Typography variant="body2">
                今週: {dateInfo.thisWeek}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2">
              週末まで: {dateInfo.daysUntilWeekend}日
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2">
              現在時刻: {dateInfo.currentTime}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}