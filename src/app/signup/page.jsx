// SignUp.jsx
"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation.js";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const info = await response.json();
    if (info.error) {
      setError(info.error);
      setSuccessMessage("");
    } else {
      setSuccessMessage("Sign-up successful! Redirecting to homepage...");
      setError("");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSignUp} className="login-form">
        <img
          className="picture"
          src="/pictures/reddit1.png"
          alt="reddit image"
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />

        <button className="login-btn" type="submit">
          Sign Up
        </button>
        <p className="error-message">{error}</p>
        <p className="success-message">{successMessage}</p>

        <div className="signup-link">
          <p>Already have an account?</p>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
