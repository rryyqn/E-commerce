"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }

  const [mode, setMode] = useState(MODE.LOGIN);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [btnMessage, setBtnMessage] = useState("Login");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log In"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";
  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const clearMessages = () => {
    setError("");
    setMessage("");
  };

  React.useEffect(() => {
    setBtnMessage(buttonTitle);
  }, [mode, buttonTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBtnMessage("Loading...");
    setError("");
    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: {
              nickname: name,
            },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your email.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });

        default:
          break;
      }
      console.log(response);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setBtnMessage("Logging In...");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 3,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");

          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid Email or Password.");
          } else if (response.errorCode == "emailAlreadyExists") {
            setError("This email is already in use.");
          } else if (response.errorCode == "resetPassword") {
            setError("Reset your password.");
          } else
            setError(
              "Something went wrong. Please try again or contact support."
            );
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval.");
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
      setBtnMessage(buttonTitle);
    }
  };
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-700">Name</Label>
            <Input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="rounded-md p-4"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-700">Email</Label>
            <Input
              type="email"
              required
              name="email"
              placeholder="Email"
              className="rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-700">Verification Code</Label>
            <Input
              type="text"
              required
              name="emailCode"
              placeholder="Verification Code"
              className="rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-700">Password</Label>
            <Input
              type="password"
              required
              name="password"
              placeholder="Password"
              className="rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm text-gray-700 cursor-pointer"
            onClick={() => {
              setMode(MODE.RESET_PASSWORD);
              clearMessages();
            }}
          >
            Forgot Password?
          </div>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-400 disabled:cursor-not-allowed hover:bg-transparent hover:text-lama hover:ring-2 ring-lama transition-all"
          disabled={isLoading}
        >
          {btnMessage ? btnMessage : buttonTitle}
        </Button>
        {message && <div className="text-gray-700 text-sm">{message}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm text-gray-700 cursor-pointer"
            onClick={() => {
              setMode(MODE.REGISTER);
              clearMessages();
            }}
          >
            Don&apos;t Have an Account? Register
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm text-gray-700 cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN);
              clearMessages();
            }}
          >
            Already Have an Account? Login
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm text-gray-700 cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN);
              clearMessages();
            }}
          >
            Return to Login
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
