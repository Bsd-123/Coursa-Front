import Routes from './routes/routes'
import './App.css'
//import Login from './login'
import Routes from './routes/routes'
import { AuthProvider } from './auth/AuthContext'
import { store } from './redux/store'
import { Provider } from 'react-redux'
<<<<<<< HEAD
export const BASE_URL = "https://localhost:7291";
function App()
{
  
  return (
    <>
    <Provider  store={store}>
      <AuthProvider>
      <Routes/>
    </AuthProvider>
    </Provider>
    
      
    </>
  )
}

export default App
