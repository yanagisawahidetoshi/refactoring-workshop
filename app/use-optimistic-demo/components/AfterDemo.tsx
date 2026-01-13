"use client";
import { useOptimistic, useState, useTransition } from "react";
import { toggleLike } from "../actions/toggleLike";

export function AfterDemo() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(99);
  const [isPending, startTransition] = useTransition();

  const [optimisticState, addOptimistic] = useOptimistic(
    { isLiked, likes },
    (state) => {
      const newIsLiked = !state.isLiked;
      const newLikes = newIsLiked ? state.likes + 1 : state.likes - 1;
      return { isLiked: newIsLiked, likes: newLikes };
    }
  );

  const handleLike = async () => {
    startTransition(async () => {
      addOptimistic({ isLiked, likes });
      const { isLiked: newIsLiked, likes: newLikes } = await toggleLike();
      setIsLiked(newIsLiked);
      setLikes(newLikes);
    });
  };

  return (
    <div className="border p-4 rounded-lg">
      <p className="mb-2">いいねの数: {optimisticState.likes}</p>
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`px-4 py-2 rounded ${
          optimisticState.isLiked
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {isPending ? "読み込み中..." : optimisticState.isLiked ? "いいね済み" : "いいねする"}
      </button>
      <div className="mt-4 text-sm text-gray-500">
        <p>現在のサーバーの状態:</p>
        <p>isLiked: {isLiked ? "true" : "false"}</p>
        <p>likes: {likes}</p>
      </div>
    </div>
  );
}
