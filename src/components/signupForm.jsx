"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/utils/api";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { OTPInput } from "./ui/otpInput";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export function SignupForm() {
  const router = useRouter();
  const [verificationStep, setVerificationStep] = useState("form");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let timer;
    if (verificationStep === "otp" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verificationStep, timeLeft]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setVerificationStep("otp");
      setEmail(formData.email);
      setTimeLeft(600); // Reset timer
      setCanResend(false);
      toast.success(
        "Signup successful! Please check your email for verification."
      ); // Show success toast
    } catch (error) {
      setError(error.message);
      toast.error(error.message); // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = useCallback(
    (seconds) =>
      `${Math.floor(seconds / 60)}:${(seconds % 60)
        .toString()
        .padStart(2, "0")}`,
    []
  );

  const handleResendOTP = useCallback(async () => {
    if (!canResend || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(API.AUTH.RESEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setTimeLeft(600);
      setCanResend(false);
      setError("");
      toast.success("Verification code resent successfully!"); // Success toast
    } catch (error) {
      setError(error.message);
      toast.error(error.message); // Error toast
    } finally {
      setIsSubmitting(false);
    }
  }, [canResend, isSubmitting, formData.email]);

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleOTPComplete = async (otpValue) => {
    const sanitizedOTP = otpValue.toString().trim();
    if (!/^\d{6}$/.test(sanitizedOTP)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(API.AUTH.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: sanitizedOTP,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast.success("OTP verified successfully! Redirecting to login..."); // Success toast
      router.push("/login");
    } catch (error) {
      setError(error.message);
      toast.error(error.message); // Error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to CareerTrack
      </h2>
      {verificationStep === "form" ? (
        <>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Create an account to get started...
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="TylerDurden"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.username}
                </span>
              )}
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign up"} &rarr;
              <BottomGradient />
            </button>
          </form>
        </>
      ) : (
        <div className="my-8">
          <p className="text-neutral-600 text-sm max-w-sm mt-2 mb-8 dark:text-neutral-300">
            Please enter the verification code sent to {email}
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            onChange={(value) => {
              setOtp(value);
              setError(""); // Clear error when user types
            }}
            disabled={isSubmitting}
          />
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Time remaining: {formatTime(timeLeft)}
          </div>
          {canResend && (
            <button
              onClick={handleResendOTP}
              disabled={isSubmitting}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 disabled:opacity-50"
              aria-label="Resend verification code"
            >
              Resend verification code
            </button>
          )}
          <button
            onClick={() => setVerificationStep("form")}
            className="mt-4 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            Back to signup
          </button>
        </div>
      )}
      <button
        className="mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={handleLoginClick}
        type="button"
      >
        Already have an Account &rarr;
        <BottomGradient />
      </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
