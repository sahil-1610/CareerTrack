"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <Link href={"/profile"}>
          <MenuItem setActive={setActive} active={active} item="Profile" />
        </Link>
        <MenuItem setActive={setActive} active={active} item="BuildCareer">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/resume">Resume Classifier</HoveredLink>
            <HoveredLink href="/courses">Course Recommendation</HoveredLink>
            <HoveredLink href="/jobs">Jobs and Opportunities</HoveredLink>
            <HoveredLink href="/mentor">Personal Mentor</HoveredLink>
          </div>
        </MenuItem>
        <Link href={"/signup"}>
          <MenuItem setActive={setActive} active={active} item="SignUp" />
        </Link>
          <button className="text-white" onClick={handleLogout} 
          >
            Log Out
          </button>
      </Menu>
    </div>
  );
}

export default Navbar;
