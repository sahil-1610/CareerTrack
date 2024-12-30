"use client";
import React, { useState } from "react";
import { SignupForm } from "@/components/signupForm";
import Footer from "@/components/Footer";

export default function Signup() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="pt-20">
        <SignupForm />
      </div>
      <Footer />
    </main>
  );
}