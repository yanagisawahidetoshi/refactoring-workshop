"use client";

import { useState, useTransition } from "react";
import { fetchSuggestions } from "../api";
import "../styles.css";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 1. Urgent update: Immediately update the input field
    setInputValue(value);

    // 2. Non-urgent update: Fetch and display suggestions in the background
    startTransition(async () => {
      const result = await fetchSuggestions(value);
      startTransition(() => {
        setSuggestions(result);
      });
    });
  };

  return (
    <div className="container">
      <h1>Suggest Demo (After)</h1>
      <p>
        Try typing fast (e.g., "ap"). The input field remains responsive, and
        only the latest suggestion list is rendered. The loading indicator is
        handled by `isPending` from `useTransition`.
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type a fruit name..."
        className="input"
      />
      {isPending && <div className="loading">Loading...</div>}
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}
