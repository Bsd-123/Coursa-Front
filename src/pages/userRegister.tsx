import LogoImg from '../assets/Logo.png';
import { useState } from 'react';
import { type User ,ROLES} from '../types/user.types';
import { useAuthContext } from '../auth/useAuthContext';
import { Link, useNavigate } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { setSession } from '../auth/auth.utils';
import {
  login as loginService,
  type LoginType,
} from '../services/auth.service';
import { Paths } from '../routes/paths';
function UserRegister(){
    const [userDetails, setUserDetails] = useState<User>({
        id : 0,
        name: "",
        email: "",
        password: "",
        role : ROLES.USER
    });
    const { setUser } = useAuthContext()
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!userDetails.email || !userDetails.password) {
            setError('יש להזין דוא"ל וסיסמה');
            return;
        }
        
        if (!userDetails.email.includes('@')) {
            setError('דוא"ל לא תקין');
            return;
        }

        if (userDetails.password.length < 6) {
            setError('הסיסמה חייבת להיות לפחות 6 תווים');
            return;
        }

        console.log('Logging in with:',  userDetails );
        setError('');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src={LogoImg} alt='Coursa Logo' className='logo'/>
                <h1>הרשמה</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">שם:</label>
                        <input
                            type="text"
                            id="name"
                            value={userDetails.name}
                            onChange={(e) => {
                                setUserDetails({...userDetails, name: e.target.value});
                                setError('');
                            }}
                            placeholder="הזן את שמך"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">דוא"ל:</label>
                        <input
                            type="email"
                            id="email"
                            value={userDetails.email}
                            onChange={(e) => {
                                setUserDetails({...userDetails, email: e.target.value});
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
                            value={userDetails.password}
                            onChange={(e) => {
                                setUserDetails({...userDetails, password: e.target.value});
                                setError('');
                            }}
                            placeholder="הזן את סיסמתך"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button">
                        הרשמה
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserRegister