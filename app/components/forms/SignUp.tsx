"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = () => {
    let isValid = true;
    if (!username.trim()) {
      setUsernameError("Email is required");
    } else if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log("Registered successfully:", response.data);
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Something went wrong!");
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-xs mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
            required
          />
          {usernameError && (
            <p className="text-red-500 text-sm mt-1">{usernameError}</p>
          )}
        </div>
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
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full pr-10 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Register
        </button>
        <div className="flex items-center justify-center">
          <p className="mt-1 mr-2 text-xs">Already have an account?</p>
          <Link href="/sign-in">
            <button className="text-xs text-blue-500 hover:underline focus:outline-none">
              Sign In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
