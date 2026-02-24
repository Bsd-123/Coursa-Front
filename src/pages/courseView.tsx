/*import { useParams } from "react-router";
import { useAppDispatch, type RootState } from "../redux/store";
import { useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import { fetchCourses } from "../redux/course/course.slice";
import { BASE_URL } from "../App";
import { useAuthContext } from "../auth/useAuthContext";

function Enrollment(params:any) {
    console.log("  ");
    
}

function CourseView()
{
    const params = useParams()
    if(!params )
        return <></>
    const dispatch = useAppDispatch();
    useEffect(() => { dispatch(fetchCourses())})
    if(params.id != undefined){
        const id = parseInt(params.id) 
    const { isAuthonticated, isInitialized, user } = useAuthContext()
    const course = useSelector((state: RootState) => state.course.courses.find(course=> course.id == id))
    const enrollment = useSelector((state: RootState) => state.enrollment.enrollments.find(enroll=> enroll.courseId == id && enroll.userId ==  user?.id))
    if (!course) return <div className="loading">טוען קורס...</div>;
        const [isEnrolling, setIsEnrolling] = useState(false);
    const [enrolled, setEnrolled] = useState(!!enrollment);

  const handleEnrollClick = async () => {
    setIsEnrolling(true);
    try {
      // הפעלת פונקציית הרישום (שיכולה להגיע מהאבא או להיות קריאת Fetch)
      //await onEnroll(course.id);
      setEnrolled(true);
      alert(`נרשמת בהצלחה לקורס: ${course.name}`);
    } catch (error) {
      alert("חלה שגיאה בתהליך הרישום, אנא נסה שוב.");
    } finally {
      setIsEnrolling(false);
    }
  };
  return (
    <div className="course-page-container" dir="rtl">
      {/* באנר עליון - Header }*/
      {/*<header className="course-hero">
        <div className="hero-content">
          <span className="skill-tag">{course.skill?.name}</span>
          <h1 className="course-main-title">{course.name}</h1>
          <p className="course-subtitle">{course.description}</p>
          
          <div className="owner-mini-card">
            <img src={`${BASE_URL}${course.owner.image}`} alt={course.owner?.ownerName} className="mini-avatar" />
            <span>מרצה: <strong>{course.owner?.ownerName}</strong></span>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img src={`${BASE_URL}${course.image}`} alt={course.name} className="main-course-image" />
        </div>
      </header>

      <div className="course-grid-layout">
        {/* צד ימין - פרטים ותוכן */}
        /*<main className="course-main-info">
          <section className="info-card">
            <h3>אודות הקורס</h3>
            <p>{course.description}</p>
            <p>בקורס זה נלמד את כל רזי ה-{course.skill?.name} בצורה מעמיקה ומקצועית...</p>
          </section>

          {/* סטטיסטיקות מעוצבות }*/
          /*<section className="stats-container">
            <div className="stat-box">
              <span className="stat-icon">👥</span>
              <span className="stat-value">1,240</span>
              <span className="stat-label">נרשמו לקורס</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">🎓</span>
              <span className="stat-value">94%</span>
              <span className="stat-label">סיימו בהצלחה</span>
            </div>
            {/* להוסיף דרוג אם רוצים */
            {/*<div className="stat-box">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">4.9</span>
              <span className="stat-label">דירוג ממוצע</span>
            </div>*/}/*
          </section>
        </main>
 
        {/* צד שמאל - תיבת רכישה (Sticky) *//*
        <aside className="purchase-sidebar">
          <div className="purchase-card">
            <div className="price-tag-large">
              <span className="currency">₪</span>
              <span className="amount">{course.price}</span>
            </div>
            
            <ul className="course-features">
              <li>✅ גישה לכל החיים</li>
              <li>✅ תעודת סיום מוכרת</li>
              <li>✅ תמיכה מקצועית מהמרצה</li>
            </ul>

            <button 
              className={`enroll-button ${enrolled ? 'success' : ''}`}
              onClick={handleEnrollClick}
              disabled={isEnrolling || enrolled}
            >
              {isEnrolling ? 'רושם אותך...' : enrolled ? 'נרשמת בהצלחה!' : 'הרשם לקורס עכשיו'}
            </button>
            
            {enrolled && <p className="success-msg">הקורס נוסף לאזור האישי שלך 🎓</p>}
            <p className="guarantee-text">התחייבות להחזר כספי מלא תוך 14 יום</p>
          </div>
        </aside>
      </div>
    </div>
  );
}return <></>
};

export default CourseView;*/

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/homePage.css';
import { useAppDispatch, type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchEnrollments } from '../redux/enrollment/enrollment.slice';
import { loginByToken } from '../services/auth.service';
import { getSession } from '../auth/auth.utils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const  CourseView = async () => {
     useDocumentTitle('CourseView');
  const navigate = useNavigate();
  const params = useParams()
  if(!params)
    return <></>
  const cId = params.id
  if(!cId)
    return <></>
  const courseId = parseInt(cId)
  const [isProcessing, setIsProcessing] = useState(false);
  const token = getSession()
  if(!token)
    return <></>
  const user = await loginByToken(token);
  const dispatch = useAppDispatch();
    
    const course = useSelector((state: RootState) => state.course.courses.find(c=> c.id == courseId))
    if(!course)
        return <></>
    useEffect(() => {
    dispatch(fetchEnrollments());
    },
     [dispatch]);
     const enrollments = useSelector((state: RootState) => state.enrollment.enrollments);
  const isAlreadyEnrolled = enrollments.find(enrollment=> enrollment.courseId == courseId && enrollment.userId == user?.id);

  const handleAction = async () => {
    if (isAlreadyEnrolled) {
      // אם רשום - עוברים לדף הלמידה הפנימי
      navigate(`/course-content/${course.id}`);
    } else {
      // אם לא רשום - עוברים לתשלום ב-Stripe
      setIsProcessing(true);
      try {
        // כאן תתבצע קריאת API שמייצרת Stripe Checkout Session
        // נניח שהשרת מחזיר URL לתשלום
        // const response = await fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ courseId: course.id }) });
        // const { stripeUrl } = await response.json();
        
        // לצורך הדוגמה, נדמה הפניה ל-Stripe
        console.log("מפנה לסטריפ עבור קורס:", course.id);
        window.location.href = "https://checkout.stripe.com/pay/..." ; 
      } catch (error) {
        alert("שגיאה במעבר לתשלום. נסה שוב.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="course-page-container" dir="rtl">
      {/* ... ה-Header וה-Content שכתבנו קודם ... */}

      <div className="course-grid-layout">
        <main className="course-main-info">
          {/* ... מידע על הקורס ... */}
        </main>

        <aside className="purchase-sidebar">
          <div className="purchase-card">
            <div className="price-tag-large">
              {isAlreadyEnrolled ? (
                <span className="enrolled-status">אתה כבר רשום! 🎓</span>
              ) : (
                <>
                  <span className="currency">₪</span>
                  <span className="amount">{course.price}</span>
                </>
              )}
            </div>
            
            <ul className="course-features">
              <li>✅ גישה מלאה לתכנים</li>
              <li>✅ תעודת סיום</li>
              <li>✅ תמיכה בפורום</li>
            </ul>

            {/* כפתור דינמי שמשנה צבע וטקסט לפי המצב */}
            <button 
              className={`action-button ${isAlreadyEnrolled ? 'go-to-course' : 'go-to-pay'}`}
              onClick={handleAction}
              disabled={isProcessing}
            >
              {isProcessing ? 'מעבד...' : isAlreadyEnrolled ? 'עבור ללמידה' : 'רכישת הקורס ומעבר לתשלום'}
            </button>
            
            {!isAlreadyEnrolled && (
                <div className="payment-icons">
                    <span>💳 תשלום מאובטח באמצעות Stripe</span>
                </div>
            )}
            
            <p className="guarantee-text">
              {isAlreadyEnrolled ? 'המשך מהנקודה שעצרת' : 'התחייבות להחזר כספי מלא תוך 14 יום'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseView;
