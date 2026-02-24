import './App.css'
//import Login from './login'
import Routes from './routes/routes'
import { AuthProvider } from './auth/AuthContext'
import AuthGuard from './auth/AuthGuard'
import OwnerRegister from './pages/ownerRegister'

function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
