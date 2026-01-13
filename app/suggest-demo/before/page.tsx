"use client";

import { useState } from "react";
import { fetchSuggestions } from "../api";
import "../styles.css";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    setIsLoading(true);
    const result = await fetchSuggestions(value);
    setSuggestions(result);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>Suggest Demo (Before)</h1>
      <p>
        Try typing fast (e.g., "ap"). You might feel the input lagging because
        the UI update is blocked by the fetching and rendering of suggestions.
        (Manually managed loading state)
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type a fruit name..."
        className="input"
      />
      {isLoading && <div className="loading">Loading...</div>}
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}
