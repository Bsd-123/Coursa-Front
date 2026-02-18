import './App.css'
//import Login from './login'
import { AuthProvider } from './auth/AuthContext'
import OwnerRegister from './pages/ownerRegister'

function App()
{

  return (
    <>
    <AuthProvider>
      <OwnerRegister/>
    </AuthProvider>
      
    </>
  )
}

export default App
