'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";


export default function Profilepage() {
    const router = useRouter()
  const [userData, setUserData] = useState<{ _id: string } | null>(null);
  const [showButton, setShowButton] = useState(true);
const [loading, setLoading] = useState(false);
    const getUserDetails = async () => { 
        try {
          const response = await axios.post("/api/users/me");
          console.log(response.data.data);
          setUserData(response.data.data);
          setShowButton(false); // Hide the button after fetching user details
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        } 
    }

  const onLogout = async () => {
    setLoading(true); // Set loading to true when logout button is clicked
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("logged out successfully");
      console.log(response.data);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading back to false after logout operation completes
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-2xl font-bold font text-blue-300 mb-6 ">
        Successfully logged in
      </h1>
      <div className="flex flex-col items-center justify-center  p-8 border border-neutral-600 rounded-2xl ">
        <hr />

        {userData ? (
          <>
            <hr />
            <h2 className="p-1 rounded ">
              <strong>User Details</strong>
            </h2>
            <ul>
              {Object.entries(userData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <hr />
          </>
        ) : (
          <p className="font-bold text-red-500">No data available!</p>
        )}
        <hr />

        {showButton && (
          <button
            onClick={getUserDetails}
            className=" mt-4 bg-black dark:bg-inherit rounded-full w-fit text-white dark:text-neutral-300 px-4 py-1 font-bold border border-neutral-600 hover:bg-green-900"
          >
            Get User Details
          </button>
        )}
      </div>

      {/* Render the logout button with spinner */}
      <button
        onClick={onLogout}
        className="  mt-6 bg-black dark:bg-inherit rounded-full w-fit text-white dark:text-neutral-300 px-4 py-2 font-bold border border-neutral-600 hover:bg-red-900 relative"
        disabled={loading} // Disable the logout button when loading is true
      >
       {loading ? <Spinner /> : "Logout"}
      </button>
    </div>
  );
}


