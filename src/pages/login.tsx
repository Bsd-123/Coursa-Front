import { useState } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import {
    login,
  type LoginType,
} from '../services/auth.service';
import Logo from '../assets/Logo.png'
import { Link, useNavigate } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { setSession } from '../auth/auth.utils';
import { Paths } from '../routes/paths';
function Login(){
    useDocumentTitle('Login');
    const navigate = useNavigate()
    const { setUser } = useAuthContext()
    const [loginDetails, setLoginDetails] = useState<LoginType>({
        email:"",
        password:""
    })
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!loginDetails.email || !loginDetails.password) {
            setError('יש להזין דוא"ל וסיסמה');
            return;
        }
        
        if (!loginDetails.email.includes('@')) {
            setError('דוא"ל לא תקין');
            return;
        }

        if (loginDetails.password.length < 6) {
            setError('הסיסמה חייבת להיות לפחות 6 תווים');
            return;
        }

        console.log('Logging in with:', { loginDetails});
        setError('');
        const user = await login(loginDetails)
        
        setSession(user.token);
        setUser(user.user)
        console.log(user)
        navigate(`/${Paths.home}`)

    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src={Logo}></img>
                <h1>התחברות</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">דוא"ל:</label>
                        <input
                            type="email"
                            id="email"
                            value={loginDetails.email}
                            onChange={(e) => {
                                setLoginDetails({email:e.target.value, password :loginDetails.password});
                                setError('');
                            }}
                            placeholder="הזן את דוא''ל"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">סיסמה:</label>
                        <input
                            type="password"
                            id="password"
                            value={loginDetails.password}
                            onChange={(e) => {
                                setLoginDetails({email:loginDetails.email, password :e.target.value});
                                setError('');
                            }}
                            placeholder="הזן את סיסמתך"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button">
                        התחברות
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login

function setAuthState(arg0: (prev: any) => any) {
    throw new Error('Function not implemented.');
}
