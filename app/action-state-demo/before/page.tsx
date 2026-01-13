"use client";

import { useState } from "react";
import { loginAction, FormState } from "../actions";
import "../styles.css";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    success: false,
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormState({ success: false, message: "" }); // Reset previous state

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formState, formData);
    
    setFormState(result);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Login Form (Before)</h1>
      <p>Manually managing loading and result states with multiple `useState` hooks.</p>
      
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" defaultValue="admin" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="password" />
      </div>
      
      {formState.message && (
        <div className={`message ${formState.success ? 'success' : 'error'}`}>
          {formState.message}
        </div>
      )}

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
