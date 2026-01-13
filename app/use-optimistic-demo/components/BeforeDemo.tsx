"use client";
import { useState, useTransition } from "react";
import { toggleLike } from "../actions/toggleLike";

export function BeforeDemo() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(99);
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    startTransition(async () => {
      const { isLiked, likes } = await toggleLike();
      setIsLiked(isLiked);
      setLikes(likes);
    });
  };

  return (
    <div className="border p-4 rounded-lg">
      <p className="mb-2">いいねの数: {likes}</p>
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`px-4 py-2 rounded ${
          isLiked
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {isPending ? "読み込み中..." : isLiked ? "いいね済み" : "いいねする"}
      </button>
    </div>
  );
}
