import React from 'react'
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast';
function HomePage() {
    return (
        <>
            <div>HomePage</div>
            <header>
                <button className='m-4 p-4 border-2 border-blue-600' onClick={() => toast.success("buttonclicked", { duration: 3000, })}>
                    click me
                </button>
                <h1 onClick={() => toast.success("buttonclicked", { duration: 3000, })} className='bg-amber-700 text-5xl text-center '>
                    Welcome to Talent Search
                </h1>
                <SignedOut>
                    <SignInButton mode='modal'>SignIn To TalentSearch</SignInButton>
                </SignedOut>

                <SignedIn>
                    <SignOutButton />
                    <UserButton />
                </SignedIn>
                <Toaster />
            </header>
        </>
    )
}

export default HomePage