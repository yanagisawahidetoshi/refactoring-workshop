'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// APIレスポンスの型定義
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export default function DataFetcher() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [selectedTimeout, setSelectedTimeout] = useState(5000);
  const [requestStats, setRequestStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0
  });

  // Axiosインスタンスの設定（直接使用）
  const createAxiosConfig = (timeout: number): AxiosRequestConfig => ({
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Refactoring-Workshop-App/1.0',
      'X-Requested-With': 'XMLHttpRequest'
    },
    validateStatus: (status) => status >= 200 && status < 300,
    maxRedirects: 3,
    retries: 2,
    retryDelay: 1000
  });

  // エラーハンドリング関数
  const handleAxiosError = (error: AxiosError): ApiError => {
    if (error.code === 'ECONNABORTED') {
      return {
        message: `リクエストがタイムアウトしました (${selectedTimeout}ms)`,
        code: 'TIMEOUT',
        status: 408
      };
    }
    
    if (error.response) {
      return {
        message: `サーバーエラー: ${error.response.status} ${error.response.statusText}`,
        status: error.response.status,
        code: 'SERVER_ERROR'
      };
    }
    
    if (error.request) {
      return {
        message: 'ネットワークエラー: サーバーに接続できませんでした',
        code: 'NETWORK_ERROR'
      };
    }
    
    return {
      message: `予期しないエラー: ${error.message}`,
      code: 'UNKNOWN_ERROR'
    };
  };

  // API統計の更新
  const updateStats = (isSuccess: boolean, responseTime: number) => {
    setRequestStats(prev => ({
      totalRequests: prev.totalRequests + 1,
      successfulRequests: prev.successfulRequests + (isSuccess ? 1 : 0),
      failedRequests: prev.failedRequests + (isSuccess ? 0 : 1),
      averageResponseTime: Math.round(
        (prev.averageResponseTime * prev.totalRequests + responseTime) / (prev.totalRequests + 1)
      )
    }));
  };

  // 投稿データを取得
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const config = createAxiosConfig(selectedTimeout);
      
      // 直接axiosを使用してリクエスト
      const response: AxiosResponse<Post[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        config
      );

      const responseTime = Date.now() - startTime;
      updateStats(true, responseTime);

      // レスポンスデータの検証
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array');
      }

      setPosts(response.data.slice(0, 10)); // 最初の10件のみ表示
      
    } catch (err) {
      const responseTime = Date.now() - startTime;
      updateStats(false, responseTime);
      
      const apiError = handleAxiosError(err as AxiosError);
      setError(apiError);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ユーザーデータを取得
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const config = createAxiosConfig(selectedTimeout);
      
      // CancelTokenを使用してリクエストのキャンセル機能を追加
      const cancelToken = axios.CancelToken.source();
      
      const response: AxiosResponse<User[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
        {
          ...config,
          cancelToken: cancelToken.token
        }
      );

      const responseTime = Date.now() - startTime;
      updateStats(true, responseTime);

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array');
      }

      setUsers(response.data);
      
    } catch (err) {
      const responseTime = Date.now() - startTime;
      
      if (axios.isCancel(err)) {
        setError({ message: 'リクエストがキャンセルされました', code: 'CANCELLED' });
      } else {
        const apiError = handleAxiosError(err as AxiosError);
        setError(apiError);
      }
      
      updateStats(false, responseTime);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 同時並行リクエスト
  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const config = createAxiosConfig(selectedTimeout);
      
      // axios.allを使用して同時リクエスト
      const [postsResponse, usersResponse] = await axios.all([
        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', config),
        axios.get<User[]>('https://jsonplaceholder.typicode.com/users', config)
      ]);

      const responseTime = Date.now() - startTime;
      updateStats(true, responseTime);

      setPosts(postsResponse.data.slice(0, 5));
      setUsers(usersResponse.data.slice(0, 5));
      
    } catch (err) {
      const responseTime = Date.now() - startTime;
      updateStats(false, responseTime);
      
      const apiError = handleAxiosError(err as AxiosError);
      setError(apiError);
      setPosts([]);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // カスタムAPIリクエスト（エラーをシミュレート）
  const testTimeoutError = async () => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const config = createAxiosConfig(100); // 100msの短いタイムアウト
      
      await axios.get('https://httpbin.org/delay/1', config); // 1秒遅延のAPI
      
    } catch (err) {
      const responseTime = Date.now() - startTime;
      updateStats(false, responseTime);
      
      const apiError = handleAxiosError(err as AxiosError);
      setError(apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>🌐 Axios Direct Usage Demo</h2>
      
      {/* コントロールパネル */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>リクエスト設定</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px' }}>タイムアウト設定:</label>
          <select
            value={selectedTimeout}
            onChange={(e) => setSelectedTimeout(Number(e.target.value))}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value={1000}>1秒</option>
            <option value={5000}>5秒</option>
            <option value={10000}>10秒</option>
            <option value={30000}>30秒</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={fetchPosts}
            disabled={isLoading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            投稿を取得
          </button>
          
          <button
            onClick={fetchUsers}
            disabled={isLoading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            ユーザーを取得
          </button>
          
          <button
            onClick={fetchAllData}
            disabled={isLoading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            全て同時取得
          </button>
          
          <button
            onClick={testTimeoutError}
            disabled={isLoading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            タイムアウトテスト
          </button>
        </div>
      </div>

      {/* 統計情報 */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px'
      }}>
        <div>
          <strong>総リクエスト数:</strong><br />
          {requestStats.totalRequests}
        </div>
        <div>
          <strong>成功:</strong><br />
          <span style={{ color: '#28a745' }}>{requestStats.successfulRequests}</span>
        </div>
        <div>
          <strong>失敗:</strong><br />
          <span style={{ color: '#dc3545' }}>{requestStats.failedRequests}</span>
        </div>
        <div>
          <strong>平均応答時間:</strong><br />
          {requestStats.averageResponseTime}ms
        </div>
      </div>

      {/* ローディング表示 */}
      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>データを読み込み中... (タイムアウト: {selectedTimeout}ms)</p>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div style={{ 
          padding: '15px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <h4>❌ エラーが発生しました</h4>
          <p><strong>メッセージ:</strong> {error.message}</p>
          {error.code && <p><strong>エラーコード:</strong> {error.code}</p>}
          {error.status && <p><strong>ステータス:</strong> {error.status}</p>}
        </div>
      )}

      {/* 投稿データ表示 */}
      {posts.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h3>📝 投稿データ</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {posts.map(post => (
              <div
                key={post.id}
                style={{
                  padding: '15px',
                  backgroundColor: '#e7f3ff',
                  borderRadius: '8px',
                  border: '1px solid #b8daff'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>
                  {post.title}
                </h4>
                <p style={{ margin: '0', color: '#495057' }}>
                  {post.body.substring(0, 100)}...
                </p>
                <small style={{ color: '#6c757d' }}>
                  投稿ID: {post.id} | ユーザーID: {post.userId}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ユーザーデータ表示 */}
      {users.length > 0 && (
        <div>
          <h3>👥 ユーザーデータ</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {users.map(user => (
              <div
                key={user.id}
                style={{
                  padding: '15px',
                  backgroundColor: '#d4edda',
                  borderRadius: '8px',
                  border: '1px solid #c3e6cb'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
                  {user.name}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {user.phone}
                  </div>
                  <div>
                    <strong>Website:</strong> {user.website}
                  </div>
                  <div>
                    <strong>Company:</strong> {user.company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}