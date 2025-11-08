import { useUser } from '@clerk/clerk-react';
import { HomePage, AboutPage, ProblemPage, DashboardPage } from './pages';
import { Navigate, Route, Routes } from 'react-router';


function App() {

  const { isSignedIn ,isLoaded} = useUser();
  console.log("isSignedIn=", isSignedIn);

  if(!isLoaded){return null;}

  return (
    <>
      <Routes>
        <Route path='/' element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path='/problems' element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
