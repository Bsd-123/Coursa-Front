import React, { useState, type ChangeEvent } from 'react';
import LogoImg from './Logo.png';
import type { owner } from './types/owner.types';

const RegisterOwner = () => {
    const [ownerDetails, setOwnerDetails] = useState<owner>({
        user: null, 
        owner_name: "",
        image: "",
        percentage: 85, // ערך ברירת מחדל
        PaymentNumber: "",
        role: 'owner'
    });

    const [error, setError] = useState<string>('');

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setOwnerDetails({
                    ...ownerDetails, 
                    image: event.target?.result as string 
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // בדיקת אחוזי רווח - הגבלה עד 85%
        if (ownerDetails.percentage > 85) {
            setError('אחוז הרווח המקסימלי הוא 85%');
            return;
        }

        if (ownerDetails.percentage < 0) {
            setError('אחוז הרווח לא יכול להיות שלילי');
            return;
        }

        if (!ownerDetails.owner_name || !ownerDetails.PaymentNumber) {
            setError('יש למלא את כל שדות החובה');
            return;
        }

        console.log('נתונים נשלחים:', ownerDetails);
        setError('');
        alert('הפרופיל עודכן בהצלחה!');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src={LogoImg} alt='Coursa Logo' className='logo'/>
                <h1>הגדרות פרופיל בעלים</h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* תמונת פרופיל */}
                    <div className="form-group" style={{ textAlign: 'center' }}>
                        {ownerDetails.image && (
                            <img src={ownerDetails.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                        )}
                        <label htmlFor="image">תמונת פרופיל:</label>
                        <input 
                            type="file" 
                            id="image" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </div>

                    {/* שם בעלים */}
                    <div className="form-group">
                        <label htmlFor="owner_name">שם בעלים:</label>
                        <input
                            type="text"
                            id="owner_name"
                            value={ownerDetails.owner_name}
                            onChange={(e) => setOwnerDetails({...ownerDetails, owner_name: e.target.value})}
                            placeholder="הזן שם מלא"
                        />
                    </div>

                    {/* מספר תשלום */}
                    <div className="form-group">
                        <label htmlFor="payment">מספר תשלום:</label>
                        <input
                            type="text"
                            id="payment"
                            value={ownerDetails.PaymentNumber}
                            onChange={(e) => setOwnerDetails({...ownerDetails, PaymentNumber: e.target.value})}
                            placeholder="הזן פרטי תשלום"
                        />
                    </div>

                    {/* אחוז רווח עם הגבלה */}
                    <div className="form-group">
                        <label htmlFor="percentage">אחוז רווח (עד 85%):</label>
                        <input
                            type="number"
                            id="percentage"
                            max="85"
                            min="0"
                            value={ownerDetails.percentage}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                setOwnerDetails({...ownerDetails, percentage: val});
                            }}
                        />
                    </div>

                    {/* ה-ROLE לא מוצג כאן יותר לבקשתך */}

                    {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                    <button type="submit" className="login-button" style={{ marginTop: '20px' }}>
                        שמור נתונים
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterOwner;