import { useState } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import {
  login as loginService,
  type LoginType,
} from '../services/auth.service';
import Logo from '../assets/Logo.png'
import { Link, useNavigate } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
function Login(){
    useDocumentTitle('Login');
    const navigate = useNavigate()
    const { setUser } = useAuthContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!email || !password) {
            setError('יש להזין דוא"ל וסיסמה');
            return;
        }
        
        if (!email.includes('@')) {
            setError('דוא"ל לא תקין');
            return;
        }

        if (password.length < 6) {
            setError('הסיסמה חייבת להיות לפחות 6 תווים');
            return;
        }

        console.log('Logging in with:', { email, password });
        setError('');
        setUser(login(email,password))
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
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
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
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
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