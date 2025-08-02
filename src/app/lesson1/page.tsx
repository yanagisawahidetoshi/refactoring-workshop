'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  BugReport as BugIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

// 作成したコンポーネントをインポート
import DateDisplay from '../components/DateDisplay';
import UserCard from '../components/UserCard';
import DataFetcher from '../components/DataFetcher';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Lesson1Page() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const antiPatterns = [
    {
      title: '直接的なライブラリ依存',
      description: 'コンポーネントが外部ライブラリを直接importし、そのAPIを直接使用している',
      examples: [
        'import { format, addDays } from "date-fns"',
        'import axios from "axios"',
        'import { Button, Card } from "@mui/material"'
      ],
      problems: [
        'ライブラリの変更時に全てのコンポーネントを修正する必要がある',
        'テストが困難（外部ライブラリのモック化が必要）',
        'コンポーネントの再利用性が低い',
        'ライブラリの知識がコンポーネント全体に散らばる'
      ]
    },
    {
      title: '設定の重複',
      description: '同じライブラリの設定が複数の場所で重複している',
      examples: [
        'axiosのタイムアウト設定が各コンポーネントで重複',
        'date-fnsのロケール設定が各使用箇所で重複',
        'MUIのテーマ設定やスタイルが散在'
      ],
      problems: [
        '設定変更時に複数の場所を修正する必要がある',
        '一貫性のない設定になりやすい',
        'メンテナンスコストが高い'
      ]
    },
    {
      title: 'エラーハンドリングの重複',
      description: '同じようなエラーハンドリングロジックが複数のコンポーネントに存在',
      examples: [
        'axiosのエラーハンドリングが各コンポーネントで重複',
        '日付パースエラーの処理が散在',
        'ローディング状態の管理が重複'
      ],
      problems: [
        'エラーハンドリングロジックの変更が困難',
        'バグが複数の場所に影響する',
        'コードの重複によるメンテナンス性の低下'
      ]
    }
  ];

  const solutions = [
    {
      title: '抽象化レイヤーの導入',
      description: '外部ライブラリを直接使用せず、独自の抽象化レイヤーを通してアクセス',
      benefits: [
        'ライブラリの変更影響を局所化',
        'テストが容易になる',
        'コンポーネントの関心事の分離'
      ]
    },
    {
      title: '依存性逆転の原則',
      description: '具体的な実装ではなく、抽象（インターフェース）に依存する',
      benefits: [
        '実装の変更が他のコードに影響しない',
        'モック化が容易',
        '柔軟な実装の切り替えが可能'
      ]
    },
    {
      title: 'ファサードパターン',
      description: '複雑なライブラリのAPIを簡単なインターフェースで隠蔽',
      benefits: [
        'ライブラリの複雑さをアプリケーションから隠す',
        '一貫したAPIの提供',
        'ライブラリの学習コストの削減'
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ページヘッダー */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          🎓 レッスン1: モジュールの隠蔽
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          外部ライブラリの直接使用による問題点を理解し、抽象化レイヤーの重要性を学ぶ
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          <Chip icon={<CodeIcon />} label="date-fns" color="primary" variant="outlined" />
          <Chip icon={<CodeIcon />} label="axios" color="secondary" variant="outlined" />
          <Chip icon={<CodeIcon />} label="Material-UI" color="success" variant="outlined" />
          <Chip icon={<BugIcon />} label="アンチパターン" color="error" variant="outlined" />
        </Box>
      </Box>

      {/* 重要な警告 */}
      <Alert severity="warning" sx={{ mb: 4 }} icon={<WarningIcon />}>
        <Typography variant="h6" component="div" gutterBottom>
          ⚠️ 学習用のアンチパターンコード
        </Typography>
        このページのコンポーネントは意図的にアンチパターンを示しています。
        本番環境では使用せず、リファクタリングの題材として活用してください。
      </Alert>

      {/* メインコンテンツ */}
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<SchoolIcon />} label="理論と問題点" />
          <Tab icon={<CodeIcon />} label="Date-fns デモ" />
          <Tab icon={<CodeIcon />} label="Material-UI デモ" />
          <Tab icon={<CodeIcon />} label="Axios デモ" />
          <Tab icon={<AssignmentIcon />} label="解決策" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h5" gutterBottom>
            📚 なぜモジュールの隠蔽が重要なのか？
          </Typography>
          
          <Typography paragraph>
            現在のコードでは、各コンポーネントが外部ライブラリを直接使用しています。
            これは短期的には開発速度を上げますが、長期的には多くの問題を引き起こします。
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            🚨 現在のコードで見つかるアンチパターン
          </Typography>

          {antiPatterns.map((pattern, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{pattern.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{pattern.description}</Typography>
                
                <Typography variant="subtitle2" gutterBottom>例:</Typography>
                <List dense>
                  {pattern.examples.map((example, i) => (
                    <ListItem key={i}>
                      <ListItemIcon><CodeIcon /></ListItemIcon>
                      <ListItemText 
                        primary={<code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px' }}>{example}</code>} 
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>問題点:</Typography>
                <List dense>
                  {pattern.problems.map((problem, i) => (
                    <ListItem key={i}>
                      <ListItemIcon><BugIcon color="error" /></ListItemIcon>
                      <ListItemText primary={problem} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h5" gutterBottom>
            📅 Date-fns 直接使用の例
          </Typography>
          <Typography paragraph>
            以下のコンポーネントは date-fns を直接importし、様々な日付操作を行っています。
            format、addDays、subDays、startOfWeek などの関数を直接使用している点に注目してください。
          </Typography>
          
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2">問題点:</Typography>
            <ul>
              <li>date-fns のAPIが変更されると、このコンポーネントも修正が必要</li>
              <li>ロケール設定が各使用箇所で重複</li>
              <li>テスト時に date-fns のモック化が必要</li>
              <li>他の日付ライブラリへの切り替えが困難</li>
            </ul>
          </Alert>

          <DateDisplay />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h5" gutterBottom>
            🎨 Material-UI 直接使用の例
          </Typography>
          <Typography paragraph>
            このコンポーネントは Material-UI の多くのコンポーネントを直接importしています。
            Card、Button、Dialog、Snackbar など、20以上のコンポーネントを直接使用している点に注目してください。
          </Typography>
          
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2">問題点:</Typography>
            <ul>
              <li>Material-UI から他のUIライブラリへの移行が困難</li>
              <li>スタイルの一貫性を保つのが困難</li>
              <li>アクセシビリティやテーマの設定が散在</li>
              <li>コンポーネントの再利用性が低い</li>
            </ul>
          </Alert>

          <UserCard />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h5" gutterBottom>
            🌐 Axios 直接使用の例
          </Typography>
          <Typography paragraph>
            このコンポーネントは axios を直接使用してHTTPリクエストを行っています。
            タイムアウト設定、エラーハンドリング、リクエスト統計などの機能が全て含まれています。
          </Typography>
          
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2">問題点:</Typography>
            <ul>
              <li>HTTP設定が各コンポーネントで重複</li>
              <li>エラーハンドリングロジックが散在</li>
              <li>他のHTTPクライアントへの切り替えが困難</li>
              <li>テスト時のモック化が複雑</li>
            </ul>
          </Alert>

          <DataFetcher />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Typography variant="h5" gutterBottom>
            💡 解決策: 抽象化レイヤーとファサードパターン
          </Typography>
          
          <Typography paragraph>
            これらの問題を解決するために、以下のパターンを適用します：
          </Typography>

          {solutions.map((solution, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{solution.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{solution.description}</Typography>
                
                <Typography variant="subtitle2" gutterBottom>メリット:</Typography>
                <List dense>
                  {solution.benefits.map((benefit, i) => (
                    <ListItem key={i}>
                      <ListItemIcon><SchoolIcon color="success" /></ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              次のステップ
            </Typography>
            <Typography paragraph>
              レッスン2では、これらのアンチパターンを実際にリファクタリングし、
              抽象化レイヤーを導入する方法を学習します。
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              disabled
              sx={{ mt: 2 }}
            >
              レッスン2へ進む（準備中）
            </Button>
          </Box>
        </TabPanel>
      </Paper>

      {/* フッター */}
      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
        <Typography variant="body2">
          🎯 学習目標: 外部ライブラリへの直接依存がもたらす問題を理解し、抽象化の必要性を認識する
        </Typography>
      </Box>
    </Container>
  );
}