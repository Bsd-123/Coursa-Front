import  { useEffect, useState } from "react";
import { Star, Users} from "lucide-react";
import { Button } from "../components/ui/button";
import LessonItem from "../components/course/lessonItem";
import type { Lesson } from "../types/lesson.types";
import type { Course } from "../types/course.types";
import { useParams } from "react-router";
import { BASE_URL } from "../App";
import fillIn from '../assets/fillIn.png'
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../redux/store";
import { fetchCourses } from "../redux/course/course.slice";
import { fetchLessonsByCourseId } from "../redux/lesson/lesson.slice";
import type { ContentType } from "../types/contentType.types";
import { fetchContentTypes } from "../redux/contentType/contentType.slice";
import { getSession } from "../auth/auth.utils";
import { getMyEnrollment } from "../services/enrollment.service";
import { BuyCourse } from "../services/stripe.service";

export default function CoursePage() {
  const [activeFilter, setActiveFilter] = useState(0);  
  const urlParams = useParams() ||" ";
  const dispatch = useAppDispatch()
  const currentId = parseInt(urlParams['id']||"0");
  const lessons : Lesson[] = useSelector((state: RootState) => state.lesson.lessons)
  const [course,setCourse] =useState<Course| null>()
  const types:ContentType[] = useSelector((state: RootState) => state.contentType.contentTypes);
const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);
    
// באפקט הקיים, נוסיף טעינת משתמש ובדיקת רישום:
useEffect(() => {
    const checkEnrollment = async () => {
      setIsLoading(true);
        const token = getSession();
        if (token && course) {
            try {
                const myEnrolls = await getMyEnrollment(course.id);
                const active = myEnrolls?.some((e: any) => new Date(e.endDate) > new Date());
                setIsAlreadyEnrolled(!!active);
            } catch (e) { console.error(e); }
        }
        setIsLoading(false);
    };
    checkEnrollment();
}, [course]);

const handleActionClick = async () => {
    if (isAlreadyEnrolled) {
        // אם כבר רשום, אפשר לגלול לסילבוס או פשוט להשאיר אותו בדף
        return; 
    }
    setIsProcessing(true);
    try {
      if(!course)
        throw "Error with course"
      const data = await BuyCourse(course);
        if (data.data.url) window.location.href = data.data.url;
    } catch (e) { alert("שגיאה במעבר לתשלום"); }
    finally { setIsProcessing(false); }
};
  const [isLoading, setIsLoading] = useState(true)
const filters = [
  { value: 0, label: "הכל" },
  ...types.map(type => ({
    value: type.id,
    label: type.displayName || type.name
  }))
];
  useEffect(() => {
  async function loadData() {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(fetchCourses());
      await dispatch(fetchContentTypes())
      const allCourses:Course[] = resultAction.payload;
      if (allCourses) {
        const foundCourse = allCourses.find(c => c.id === currentId);    
        if (foundCourse&& foundCourse!== undefined) {
          setCourse(foundCourse);
          await dispatch(fetchLessonsByCourseId(foundCourse.id));
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }
  loadData();
}, [dispatch, currentId]);
  const filteredLessons = activeFilter === 0
    ? lessons
    : lessons.filter(l => l.type.id === activeFilter);
const counts = lessons.reduce((acc, l) => {
  const typeId = l.type.id;
  
  // אנחנו יוצרים את המפתח רק אם פגשנו שיעור כזה
  acc[typeId] = (acc[typeId] || 0) + 1;
  
  return acc;
}, {} as Record<number, number>);
const existingTypes: ContentType[] = types.filter(t=> counts[t.id])
// תוצאה לדוגמה: { 1: 5, 2: 3 } (סוגים שאין להם שיעורים פשוט לא יופיעו כאן)
  if(!course|| course === undefined)
    return <>Why???</>
  if(isLoading)
    return <h1>Loading...</h1>
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    <div className="flex items-center gap-2 mb-4">
       <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-l font-medium">
         {course.skill?.name}
       </span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{course.name}</h1>
    <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-2xl">{course.description}</p>
    
    <div className="flex flex-wrap items-center gap-6 text-sm">
      <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-lg pr-4">
        <img src={`${BASE_URL}${course.owner.image}`}
        alt={course.owner.ownerName} className="rounded-xl w-full h-44 object-cover mb-6 shadow-inner" />
        <div>
          <p className="text-slate-400 text-xs">מרצה הקורס</p>
          <p className="font-bold">{course.owner?.ownerName}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 border-r border-slate-700 mr-2 pr-6">
        <div className="flex items-center gap-1.5 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold">4.9</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-slate-400" />
          <span>1,240 תלמידים</span>
        </div>
      </div>
    </div>
    {!isAlreadyEnrolled && <div className="hidden lg:block">
    <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl transform translate-y-4">
      <img
        src={`${BASE_URL}${course.image}`}
        alt={course.name}
        className="rounded-xl w-full h-44 object-cover mb-6 shadow-inner"
      />
      
      <div className="mb-6">
        {isAlreadyEnrolled ? (
            <div className="text-green-600 font-bold text-xl flex items-center gap-2">
                <span>נרשמת בהצלחה!</span>
                <span className="text-2xl">🎓</span>
            </div>
        ) : (
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">₪{course.price}</span>
                <span className="text-slate-500 text-sm line-through">₪{course.price * 1.5}</span>
            </div>
        )}
      </div>

      <ul className="space-y-3 mb-8 text-sm text-slate-600">
        <li className="flex items-center gap-2">✅ גישה מלאה ל-{lessons.length} שיעורים</li>
        <li className="flex items-center gap-2">✅ תעודת סיום רשמית</li>
        <li className="flex items-center gap-2">✅ תמיכה לכל החיים</li>
      </ul>

      <Button 
        className={`w-full py-6 rounded-xl text-lg font-bold transition-all ${
            isAlreadyEnrolled ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white shadow-lg shadow-blue-200`}
        onClick={handleActionClick}
        disabled={isProcessing}
      >
        {isProcessing ? 'מעבד...' : isAlreadyEnrolled ? 'המשך ללמידה' : 'הרשם לקורס עכשיו'}
      </Button>
      
      <p className="text-center text-xs text-slate-400 mt-4">
        התחייבות להחזר כספי מלא תוך 14 יום
      </p>
    </div>
  </div>
  }
  </div>

  {/* כרטיס רכישה צף (Sticky Sidebar style) */}
  
      {/* תוכן */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* סטטיסטיקות to add more...*/}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {existingTypes.map(({ id, name, displayIcon, displayName }) => (
            <div key={id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
             <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-slate-50 overflow-hidden border">
              <img 
  src={displayIcon ? `${BASE_URL}${displayIcon}` : fillIn}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = fillIn; // אם הלינק מהשרת שבור, שים את תמונת המילוי
  }}
                    alt="icon" className="w-full h-full object-contain p-1" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{counts[id]}</div>
              <div className="text-sm text-slate-500">{displayName || name}</div>
            </div>
          ))}
        </div>

        {/* רשימת שיעורים */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          {/* כותרת + פילטרים */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-800">תוכן הקורס</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === f.value
                      ? "bg-gradient-to-r from-[#FA8072] to-[#40E0D0] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* שיעורים */}
          <div className="divide-y divide-slate-50 p-2">
            {filteredLessons.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}