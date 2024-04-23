"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, SetUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Signup successful", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to NextAuth-App
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          Your streamlined solution for seamless authentication integration.
        </p>
      </div>

      <div className=" max-w-sm w-full mx-auto rounded-2xl mt-8 md:rounded-2xl p-8 md:p-8 shadow-input bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Login To Your Account</h2>

        <form className="my-8" onSubmit={onLogin}>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={user.email}
              onChange={(e) => SetUser({ ...user, email: e.target.value })}
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={user.password}
              onChange={(e) => SetUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
            type="submit"
            disabled={buttonDisabled || loading}
            onClick={onLogin}
          >
            {loading
              ? "Logging in..."
              : buttonDisabled
              ? "Please fill the form"
              : " Login →"}
            <BottomGradient />
          </button>

          <div className="text-center mt-4">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              No account?
            </span>{" "}
            <Link
              href="/signup"
              className="text-sm text-zinc-600 dark:text-zinc-200 hover:underline "
            >
              Sign up{" "}
            </Link>
          </div>
        </form>
      </div>
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
