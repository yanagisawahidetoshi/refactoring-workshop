"use server";

import { revalidatePath } from "next/cache";

// これがデータベースの代わり
let isLiked = false;
let likes = 99;

export const getPost = async () => {
  return {
    isLiked,
    likes,
  };
};

export const toggleLike = async () => {
  // 擬似的なネットワーク遅延
  await new Promise((resolve) => setTimeout(resolve, 1000));
  isLiked = !isLiked;
  likes = isLiked ? likes + 1 : likes - 1;
  revalidatePath("/use-optimistic-demo/before");
  revalidatePath("/use-optimistic-demo/after");
  return {
    isLiked,
    likes,
  };
};
