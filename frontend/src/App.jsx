import { useUser } from '@clerk/clerk-react';
import { HomePage, AboutPage, ProblemsPage, DashboardPage, ProblemDetailPage } from './pages';
import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';


function App() {

  const { isSignedIn ,isLoaded} = useUser();
  console.log("isSignedIn=", isSignedIn);

  if(!isLoaded){return null;}

  return (
    <>
      <Routes>
        <Route path='/' element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path='/problems/:id' element={isSignedIn ? <ProblemDetailPage /> : <Navigate to={"/"} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
