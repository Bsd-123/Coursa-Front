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
  
=======
>>>>>>> 4f2870edf90c89ca3fc26234e2f3f29b1e26c9cf

function App() {

>>>>>>> 236a4ab562dd2d7affec24b25e2586ddf8fd8a73
  return (
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
