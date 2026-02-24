import  { useEffect } from 'react';
import { useAppDispatch, type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchOwners } from '../redux/owner/owner.slice';
import { fetchCourses } from '../redux/course/course.slice';
import { useNavigate, useParams } from 'react-router';
import { BASE_URL } from '../App';
import { Paths } from '../routes/paths';


function OwnerView()
{
  const params = useParams()
  const navigate = useNavigate()
  if(params.id != undefined)
  {
    const id = parseInt(params.id) 
    const dispatch = useAppDispatch();
    const owner = useSelector((state: RootState) => state.owner.owners).find(owner => owner.id == id);
    const courses = useSelector((state: RootState) => state.course.courses.filter(course=> course.owner.id == id))
    useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchCourses())
    
    },
     [dispatch]);
    if (!owner) return <div className="p-8 text-center">טוען נתונים...</div>;

  return (
    <div className="owner-profile">
      <header className="owner-header">
        <div className="owner-avatar-container">
          <img 
            src={`${BASE_URL}${owner.image}`} 
            className="owner-image" 
            alt={owner.ownerName} 
          />
          <span className="status-dot"></span>
        </div>

        <div className="owner-info">
          <h2 className="owner-name">{owner.ownerName}</h2>
          <h4>כאן נוסיף תאור על הבעלים</h4>
          <h4>כאן נוסיף מספר נרשמים לקורסים </h4>
          <h3>{`מס' הקורסים שלנו: ${courses.length}`}</h3>
        </div>
      </header>

      <section className="courses-section">
        <h2 className="course-title">הקורסים שלנו</h2>
        
        <div className="courses-grid">
          {courses.map(course => (
            <article key={course.id} className="course-card">
              <div className="course-img-wrapper">
                {course.image && <img src={`${BASE_URL}${course.image}`} className="course-img" alt={course.name} />}
                
              </div>
              
              <div className="course-content">
                <div className="course-skill">
                  <h3>תחום הקורס:</h3>
                  <span className="category-label">{course.skill?.name}</span>
                </div>
                
                <h3 className="course-title">{course.name}</h3>
                <p className="course-desc">{course.description}</p>
                
                <div className="course-footer">
                  <div className="price-tag">{course.price} ₪</div>
                  <button className="details-btn" onClick={()=> navigate(`/${Paths.courseView}/${course.id}`)}>לפרטים המלאים</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
  }
  return <></>
};

export default OwnerView;