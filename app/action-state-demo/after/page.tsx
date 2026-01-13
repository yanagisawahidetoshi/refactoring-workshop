"use client";

import { useActionState } from "react";
import { loginAction, FormState } from "../actions";
import "../styles.css";

const initialState: FormState = {
  success: false,
  message: "",
};

export default function Page() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="form-container">
      <h1>Login Form (After)</h1>
      <p>Simplified state management with a single `useActionState` hook.</p>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" defaultValue="admin" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="password" />
      </div>

      {state.message && (
        <div className={`message ${state.success ? 'success' : 'error'}`}>
          {state.message}
        </div>
      )}

      <button type="submit" className="submit-button" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
