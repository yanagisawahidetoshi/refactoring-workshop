'use client';

import Link from 'next/link';
import { Card, CardContent, Typography, Button, Box, Container, Chip } from '@mui/material';
import { School as SchoolIcon, Code as CodeIcon, BugReport as BugIcon } from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          🎓 リファクタリング勉強会
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          ライブラリ抽象化と依存性逆転の原則を学ぶ
        </Typography>
        <Typography variant="body1" color="text.secondary">
          外部ライブラリへの直接依存から抽象化レイヤーを通した設計への移行を実践的に学習します
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, maxWidth: 800, mx: 'auto' }}>
        {/* レッスン1 */}
        <Card elevation={3} sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BugIcon sx={{ mr: 2, color: 'error.main' }} />
              <Typography variant="h4" component="h2">
                レッスン1: モジュールの隠蔽
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              外部ライブラリを直接使用することの問題点を実際のコードで確認し、
              なぜ抽象化レイヤーが必要なのかを理解します。
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              <Chip icon={<CodeIcon />} label="date-fns" size="small" />
              <Chip icon={<CodeIcon />} label="axios" size="small" />
              <Chip icon={<CodeIcon />} label="Material-UI" size="small" />
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
              学習内容:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>直接的ライブラリ依存の問題点</li>
              <li>設定とエラーハンドリングの重複</li>
              <li>テストの困難さ</li>
              <li>ライブラリ変更時の影響範囲</li>
            </ul>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link href="/lesson1" passHref>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<SchoolIcon />}
                  sx={{ px: 4 }}
                >
                  レッスン1を開始
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>

        {/* レッスン2 (準備中) */}
        <Card elevation={1} sx={{ opacity: 0.6 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ mr: 2, color: 'success.main' }} />
              <Typography variant="h4" component="h2">
                レッスン2: 抽象化レイヤーの実装
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              レッスン1で学んだ問題点を解決するための抽象化レイヤーを実際に実装し、
              リファクタリングを行います。
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              学習内容:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>ファサードパターンの実装</li>
              <li>依存性注入の導入</li>
              <li>インターフェース設計</li>
              <li>段階的リファクタリング</li>
            </ul>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                size="large"
                disabled
                sx={{ px: 4 }}
              >
                準備中
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* レッスン3 (準備中) */}
        <Card elevation={1} sx={{ opacity: 0.6 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h4" component="h2">
                レッスン3: テストとメンテナンス
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              抽象化レイヤーを導入したコードのテスト方法と、
              長期的なメンテナンス性の向上について学習します。
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              学習内容:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>モックとスタブの活用</li>
              <li>単体テストの書き方</li>
              <li>実装の切り替え方法</li>
              <li>バージョンアップ対応</li>
            </ul>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                size="large"
                disabled
                sx={{ px: 4 }}
              >
                準備中
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6, py: 3, color: 'text.secondary' }}>
        <Typography variant="body2">
          💡 各レッスンは段階的に進行し、実際のコードリファクタリングを通して学習します
        </Typography>
      </Box>
    </Container>
  );
}
