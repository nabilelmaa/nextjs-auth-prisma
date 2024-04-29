"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Dashboard from "@/app/dashboard/page";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      console.log("Sign-in successful:", response.data);
      const username: string = response.data.user.username;
      setIsLogged(true);
      setLoading(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Either your email or password is wrong!");
      setTimeout(() => {
        setError("");
      }, 4000);
      setLoading(false);
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-xs mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.png" alt="logo" width={150} height={150} />
        <h2 className="text-xl mb-4 text-center">Loging to your account</h2>
      </div>
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
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
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
          <div className="relative focus:border-blue-500">
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
        {error && <p className="mt-2 text-red-500 text-center text-xs">{error}</p>}
        {/* {isLoggedIn && <Dashboard props={username} />} */}
      </form>
    </div>
  );
};

export default SignInForm;
