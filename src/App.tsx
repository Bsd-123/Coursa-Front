import Routes from './routes/routes'
import './App.css'
//import Login from './login'
import { AuthProvider } from './auth/AuthContext'
import { store } from './redux/store'
import { Provider } from 'react-redux'

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
