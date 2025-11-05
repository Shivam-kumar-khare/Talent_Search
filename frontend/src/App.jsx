import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

function App() {


  return (
    <>
      <header>
        <h1>Welcome to Talent Search</h1>
        <SignedOut>
          <SignInButton mode='modal'>SignIn To TalentIQ</SignInButton>
        </SignedOut>

        <SignedIn>
          <SignOutButton />
          <UserButton />
        </SignedIn>
      </header>
    </>
  )
}

export default App
