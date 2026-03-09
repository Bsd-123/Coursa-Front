import LogoImg from '../assets/Logo.png';
import { useState } from 'react';
import { ROLES} from '../types/user.types';
import { useAuthContext } from '../auth/useAuthContext';
import {  useNavigate } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getSession, setSession } from '../auth/auth.utils';
import { Paths } from '../routes/paths';
import { register } from '../services/auth.service';
function UserRegister(){
    useDocumentTitle("Register")
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        regDate: new Date,
        role : ROLES.USER,
        resetPasswordToken: "",
        resetTokenExpires: new Date(),
        status: true
    });
    const navigate = useNavigate()
    const { setUser } = useAuthContext()
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
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

        const user = await register(userDetails)
        setSession(user.token);
        localStorage.setItem("token",getSession() || "")
        setUser(user.user)
        navigate(`/${Paths.home}`)
        
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