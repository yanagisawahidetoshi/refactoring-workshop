import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const useBlogData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // axiosを直接使用してデータを取得
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // axiosの設定を直接指定
      const axiosConfig = {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'BlogViewer/1.0'
        }
      };

      // 並行してAPIリクエストを実行
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts', axiosConfig),
        axios.get('https://jsonplaceholder.typicode.com/users', axiosConfig)
      ]);

      setPosts(postsResponse.data);
      setUsers(usersResponse.data);
      setError(null);
    } catch (err) {
      console.error('データの取得に失敗しました:', err);
      setError('データの読み込みに失敗しました。しばらく後にもう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        timeout: 5000
      });
      setPosts(response.data);
      return true;
    } catch (err) {
      setError('更新に失敗しました');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  return {
    posts,
    users,
    loading,
    error,
    refreshPosts,
    getUserById
  };
};