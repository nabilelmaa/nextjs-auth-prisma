"use client";

import React, { use, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastSuccess, setToastSuccess] = useState<boolean>(false);
  // const router = useRouter();

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
      setLoading(false);
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log("Registered successfully:", response.data);
      setShowPassword(false);
      setLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
      setToastSuccess(true);
      setTimeout(() => {
        setToastSuccess(false);
        // router.push('/sign-in');
      }, 2000);
    } catch (error) {
      setError("Email already exist!");
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
        <h2 className="text-xl mb-4 text-center">Create a new account</h2>
      </div>
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
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
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
          className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {loading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "Register"
          )}
        </button>
        <div className="flex items-center justify-center">
          <p className="mt-1 mr-2 text-xs">Already have an account?</p>
          <Link href="/sign-in">
            <button className="text-xs text-blue-500 hover:underline focus:outline-none">
              Sign In
            </button>
          </Link>
        </div>
        {toastSuccess && (
          <div className="toast toast-end">
            <div className="alert alert-info bg-white border-green-500 p-2">
              <div className="flex items-center">
                <Image
                  src="/success.png"
                  alt="success"
                  width={35}
                  height={35}
                />
                Account created successfully!
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
