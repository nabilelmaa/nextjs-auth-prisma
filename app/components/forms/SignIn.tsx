"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      console.log("Sign-in successful:", response.data);
      setLoading(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Login failed! Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xs mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {loading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "Sign In"
          )}
        </button>
        <div className="flex items-center justify-center">
          <p className="mt-1 mr-2 text-xs">Don't have an account?</p>
          <Link href="/sign-up">
            <button className="text-xs text-blue-500 hover:underline focus:outline-none">
              Sign Up
            </button>
          </Link>
        </div>
        {error && (
          <p className="mt-2 text-red-500 font-semibold text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
