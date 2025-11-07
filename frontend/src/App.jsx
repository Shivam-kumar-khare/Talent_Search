import { useUser } from '@clerk/clerk-react';
import { HomePage,AboutPage ,ProblemPage} from './pages';
import { Navigate, Route,Routes } from 'react-router';


function App() {

  const {isSignedIn}=useUser();
  console.log("isSignedIn=",isSignedIn);

  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/problems' element={isSignedIn?<ProblemPage/>:<Navigate to={"/"}/>}/>
      </Routes>
    </>
  )
}

export default App
