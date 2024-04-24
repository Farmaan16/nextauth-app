// profile/[id]/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/router";

interface UserData {
  email: string;
  username: string;
  password: string;
  _id: string;
  isVerified: boolean;
}

const UserProfilePage = ({ userData }: { userData: UserData }) => {
const router = useRouter();
  const { id } = router.query || {}; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold font text-red-700 dark:text-stone">
        User Profile
      </h1>
      <hr />
      <div className="mt-6 border border-neutral-400 rounded-2xl flex flex-col justify-center">
        <span className="p-2 ml-2 rounded font-bold text-zinc-400">
          ID: {id}
        </span>
        {userData && (
          <>
            <span className="p-2 ml-2 rounded font-bold text-zinc-400">
              Username: {userData.username}
            </span>
            {/* Add other user data fields here */}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
