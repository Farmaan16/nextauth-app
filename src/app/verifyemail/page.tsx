'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'



export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
          setVerified(true);
          setError(false);
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    };

    useEffect(() => {
        setError(false)
       const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])
    
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white dark:bg-black text-black dark:text-white">
        <h1 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center  ">
          Verify Email
        </h1>
        <h2 className=" mt-4 text-base text-neutral-800 dark:text-neutral-500 text-center border border-zinc-500 rounded-lg p-2">
          {token ? ` ${token}` : " No Token"}
        </h2>
        {verified && (
          <div className='justify-center items-center flex flex-col' >
            <h1 className="mt-4 font-bold text-sm text-green-500 dark:text-green-600 text-center  ">
              Email Verified ✓{" "}
            </h1>
            <Link href="/login" className="mt-4 font-bold text-sm text-neutral-800 dark:text-neutral-300 text-center border border-zinc-400 rounded-lg px-3 py-1 hover:bg-zinc-900 hover:text-neutral-100 ">Login</Link>
          </div>
        )}
        {error && (
          <h1 className="font-bold text-2xl mt-4 text-red-800 dark:text-red-500 text-center  ">
            Error!
          </h1>
        )}
      </div>
    );
}


