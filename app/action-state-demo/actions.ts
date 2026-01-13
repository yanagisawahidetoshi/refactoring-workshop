// Simulate a server action for login

export type FormState = {
  success: boolean;
  message: string;
};

export const loginAction = async (
  previousState: FormState,
  formData: FormData
): Promise<FormState> => {
  console.log("Login action triggered");
  console.log("Previous state:", previousState);

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (username === "admin" && password === "password") {
    console.log("Login successful");
    return { success: true, message: "ログインに成功しました！" };
  } else {
    console.log("Login failed");
    return {
      success: false,
      message: "ユーザー名またはパスワードが間違っています。",
    };
  }
};
