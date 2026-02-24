import { useEffect } from 'react';
import { AboutSection } from '../sections/aboutSection';
import '../styles/homePage.css'; // נניח שזה קובץ ה-CSS שלך
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../redux/store';
import { fetchOwners } from '../redux/owner/owner.slice';
import { fetchCourses } from '../redux/course/course.slice';
// בקובץ הגדרות או בראש הקומפוננטה
const BASE_URL = "https://localhost:7291"; // ה-URL של שרת ה-API שלך

const HomePage = () => {

    const dispatch = useAppDispatch();
  
    const owners = useSelector((state: RootState) => state.owner.owners);
    const courses = useSelector((state: RootState) => state.course.courses)
    useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchCourses())
    
    },
     [dispatch]);
   
    return (
        <div className="home-page-container">
            {/* סקשן קורסים זמינים */}
            <section className="featured-courses">
                <h2>קורסים זמינים ומבוקשים</h2>
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card">
                            <img src={`${BASE_URL}${course.image}`} alt={course.name} className="course-image" />
                            <h3>{course.name}</h3>
                            <p className="course-description">{course.description}</p>
                            <p className="course-publisher">מפרסם: {course.owner.ownerName}</p>
                            <p className="course-rating">מחיר: {course.price} ⭐</p>
                            <button className="view-course-button" onClick={()=> console.log(owners)}>צפה בקורס</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* סקשן מפרסמים בולטים */}
            <section className="prominent-publishers">
                <h2>מפרסמים מובילים</h2>
                <div className="publishers-grid">
                    {owners.map(publisher => (
                        <div key={publisher.id} className="publisher-card">
                            <img src={`${BASE_URL}${publisher.image}`} alt={publisher.ownerName} className="publisher-logo" />
                            <h3>{publisher.ownerName}</h3>
                            <p className="publisher-description">כדאי להוסיף תיאור על הבעלים</p>
                            <button className="view-publisher-button">צפה במפרסם</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* סקשן אודות */}
            <AboutSection/>
        </div>
    );
};

export default HomePage;