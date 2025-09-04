"use client";

import { useEffect, useMemo, useState } from "react";
import { Todo, TodoStatistics } from "../types/todo";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center" as const,
    color: "#333",
    marginBottom: "30px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  statItem: {
    textAlign: "center" as const,
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  filterContainer: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  filterButton: (active: boolean) => ({
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: active ? "#007bff" : "#e9ecef",
    color: active ? "white" : "#333",
    fontSize: "14px",
  }),
  todoItem: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  todoTitle: (completed: boolean) => ({
    fontSize: "18px",
    fontWeight: "bold",
    color: completed ? "#666" : "#333",
    textDecoration: completed ? "line-through" : "none",
    marginBottom: "8px",
  }),
  todoDescription: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "12px",
  },
  todoMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#999",
  },
  priorityBadge: (priority: string) => ({
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "bold",
    backgroundColor:
      priority === "high"
        ? "#dc3545"
        : priority === "medium"
        ? "#ffc107"
        : "#28a745",
    color: "white",
  }),
  checkbox: {
    marginRight: "8px",
    transform: "scale(1.2)",
  },
  noTodos: {
    textAlign: "center" as const,
    color: "#666",
    fontSize: "18px",
    marginTop: "40px",
  },
};

const generateMockTodos = (): Todo[] => {
  const titles = [
    "買い物に行く",
    "プレゼンテーションを準備する",
    "コードレビューをする",
    "ドキュメントを更新する",
    "テストケースを追加する",
    "ミーティングの準備",
    "新機能の設計書作成",
    "バグ修正",
  ];

  const descriptions = [
    "牛乳、パン、卵を購入する",
    "来週のクライアントミーティング用の資料を作成",
    "チームメンバーのプルリクエストを確認",
    "APIドキュメントを最新状態に更新",
    "エッジケースをカバーするテストを追加",
    "アジェンダと参加者リストを準備",
    "新しいダッシュボード機能の詳細設計",
    "ユーザー報告のバグを調査・修正",
  ];

  const priorities: Array<"low" | "medium" | "high"> = [
    "low",
    "medium",
    "high",
  ];

  return Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: titles[index],
    description: descriptions[index],
    completed: Math.random() < 0.3,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  }));
};

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // モックデータの読み込みをシミュレート
    const loadTodos = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800)); // 非同期処理をシミュレート
      setTodos(generateMockTodos());
      setLoading(false);
    };

    loadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "pending":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats: TodoStatistics = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return {
    todos: filteredTodos,
    stats,
    filter,
    setFilter,
    loading,
    toggleTodo,
  };
};

export default function TodosPage() {
  // 🚨 状態管理とビジネスロジック
  const { todos, stats, filter, setFilter, loading, toggleTodo } = useTodos();

  // 🚨 ユーティリティ関数
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP");
  };

  // 🚨 ローディング状態の表示
  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>ToDo 一覧</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>ToDo 一覧</h1>

      {/* 🚨 統計表示機能 */}
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.total}</div>
          <div style={styles.statLabel}>合計</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.completed}</div>
          <div style={styles.statLabel}>完了</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.pending}</div>
          <div style={styles.statLabel}>未完了</div>
        </div>
      </div>

      {/* 🚨 フィルター機能 */}
      <div style={styles.filterContainer}>
        <button
          style={styles.filterButton(filter === "all")}
          onClick={() => setFilter("all")}
        >
          すべて
        </button>
        <button
          style={styles.filterButton(filter === "pending")}
          onClick={() => setFilter("pending")}
        >
          未完了
        </button>
        <button
          style={styles.filterButton(filter === "completed")}
          onClick={() => setFilter("completed")}
        >
          完了済み
        </button>
      </div>

      {/* 🚨 ToDo一覧表示機能 */}
      <div>
        {todos.length === 0 ? (
          <div style={styles.noTodos}>
            {filter === "all"
              ? "ToDoがありません"
              : filter === "completed"
              ? "完了済みのToDoがありません"
              : "未完了のToDoがありません"}
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} style={styles.todoItem}>
              <div style={styles.todoTitle(todo.completed)}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={styles.checkbox}
                />
                {todo.title}
              </div>
              <div style={styles.todoDescription}>{todo.description}</div>
              <div style={styles.todoMeta}>
                <span>作成日: {formatDate(todo.createdAt)}</span>
                <span style={styles.priorityBadge(todo.priority)}>
                  {todo.priority === "high"
                    ? "高"
                    : todo.priority === "medium"
                    ? "中"
                    : "低"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
