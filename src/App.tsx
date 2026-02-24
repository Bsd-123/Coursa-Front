import Routes from './routes/routes'
import './App.css'
//import Login from './login'
import Routes from './routes/routes'
import { AuthProvider } from './auth/AuthContext'
<<<<<<< HEAD
import AuthGuard from './auth/AuthGuard'
import OwnerRegister from './pages/ownerRegister'
=======
import { store } from './redux/store'
import { Provider } from 'react-redux'
>>>>>>> 4f2870edf90c89ca3fc26234e2f3f29b1e26c9cf

function App() {

  return (
<<<<<<< HEAD
    <AuthProvider>
      <Routes />
    </AuthProvider>
=======
    <>
    <Provider  store={store}>
      <AuthProvider>
      <Routes/>
    </AuthProvider>
    </Provider>
    
      
    </>
>>>>>>> 4f2870edf90c89ca3fc26234e2f3f29b1e26c9cf
  )
}

export default App
