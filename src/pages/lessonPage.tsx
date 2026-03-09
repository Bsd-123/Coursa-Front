import { useEffect, useState } from "react";
import { ArrowRight, Clock, ChevronLeft, ChevronRight, Lock, CheckCircle2, ShoppingCart, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import VideoPlayer from "../components/lesson/VideoPlayer";
import PdfViewer from "../components/lesson/PdfViewer";
import QuizViewer from "../components/lesson/QuizViewer";
import { useNavigate, useParams } from "react-router";
import { Paths } from "../routes/paths";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../redux/store";
import type { Lesson } from "../types/lesson.types";
import { fetchLessonsByCourseId } from "../redux/lesson/lesson.slice";
import type { ContentType } from "../types/contentType.types";
import fillIn from '../assets/fillIn.png'
import { BASE_URL } from "../App";
import type { Course } from "../types/course.types";
import { fetchCourses } from "../redux/course/course.slice";
import { fetchContentTypes } from "../redux/contentType/contentType.slice";
import { getSession } from "../auth/auth.utils";
import { getMyEnrollment } from "../services/enrollment.service";
import { PlayCircle, Gift, Info } from 'lucide-react';



function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}
const ComponentMap: Record<string, React.ComponentType<any>> = {
  'video': VideoPlayer,
  'text': PdfViewer,
  'Quiz': QuizViewer,
  // קל מאוד להוסיף כאן סוגים חדשים בעתיד (למשל 4: AudioPlayer)
};

export default function LessonPage() {
    const dispatch = useAppDispatch();
  useEffect(() => {
      // טוענים את הנתונים אם הם לא קיימים
      //dispatch(fetchLessons());
  }, [dispatch]);
  const urlParams = useParams() ||" ";
  const courseId = parseInt(urlParams['courseId']||"0");
    const [lessonId, setLessonId] = useState(parseInt(urlParams['lessonId']||"0"));
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const lessons:Lesson[] = useSelector((state: RootState) => state.lesson.lessons);
  const types:ContentType[] = useSelector((state: RootState) => state.contentType.contentTypes);
  const [isLoading, setIsLoading] = useState(true)
  const [isAvilable, setIsAvilable] = useState(true);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
const navigate = useNavigate();
useEffect(() => {
  async function loadData() {
    // 1. הגנה: אם אין מזהי קורס או שיעור, אין טעם להמשיך
    if (!courseId || !lessonId) return;

    setIsLoading(true);
    try {
      // 2. קריאות מקבילות לנתונים כלליים (חוסך זמן)
      const [coursesResult] = await Promise.all([
        dispatch(fetchCourses()),
        dispatch(fetchContentTypes())
      ]);

      const allCourses: Course[] = coursesResult.payload;
      const foundCourse = allCourses?.find(c => c.id === courseId);

      if (!foundCourse) {
        console.warn("Course not found");
        return;
      }

      // 3. בדיקת רישום (Enrollment)
      let enrolled = false;
      const token = getSession();
      if (token) {
        try {
          const myEnrolls = await getMyEnrollment(courseId);
          enrolled = !!myEnrolls?.some((e: any) => new Date(e.endDate) > new Date());
          setIsAlreadyEnrolled(enrolled)
        } catch (e) {
          console.error("Enrollment check failed:", e);
        }
      }

      // 4. טעינת שיעורים ומציאת השיעור הנוכחי
      const lessonsAction = await dispatch(fetchLessonsByCourseId(foundCourse.id));
      const theseLessons: Lesson[] = lessonsAction.payload;

      if (theseLessons) {
        const currentFoundLesson = theseLessons.find(l => l.id === lessonId);
        
        // 5. לוגיקת הרשאות
        if (currentFoundLesson) {
          if (!enrolled && !currentFoundLesson.isFree) {
              setIsAvilable(false)
          } else {
            setLesson(currentFoundLesson);
            setIsAvilable(true)
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  loadData();
}, [dispatch, courseId, lessonId]);
  const [lesson,setLesson] =useState<Lesson| null | undefined>() || lessons[0];
  if(isLoading)
    return<>Loading...</>
  if(!lesson)
    return<>Why???</>
  const prevLesson = lesson.idx > 1 ? lessons.find(l=> l.idx===lesson.idx - 1) : null;
  const nextLesson = lesson.idx < lessons.length ? lessons.find(l=> l.idx===lesson.idx + 1) : null;
  const config = types.find(t=> lesson.type.id === t.id) || types[0];
  const aside = <aside className="lg:w-80 lg:min-h-screen bg-white border-l border-slate-100 shadow-sm flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <a href={`${Paths.courseView}/${lesson.course.id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-[#FA8072] transition-colors text-sm mb-3">
            <ArrowRight className="w-4 h-4" />
            חזרה לקורס
          </a>
          <h2 className="font-bold text-slate-800 text-sm">תוכן הקורס</h2>
          <p className="text-xs text-slate-500 mt-1">{lessons.length} שיעורים</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lessons.map((l) => {
            const isActive = l.id === lesson.id;
            return (
              <button
                key={l.id}
                onClick={() => setLessonId(l.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-right transition-all border-r-4 ${
                  isActive
                    ? "bg-[#FA8072]/5 border-[#FA8072]"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive
                    ? "border-[#FA8072] bg-[#FA8072]/10"
                    : completedIds.includes(l.id)
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 bg-white"
                }`}>
                  {completedIds.includes(l.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
<div 
  style={{
    maskImage: `url(${l.type.displayIcon ? `${BASE_URL}${l.type.displayIcon}` : fillIn})`,
    WebkitMaskImage: `url(${l.type.displayIcon ? `${BASE_URL}${l.type.displayIcon}` : fillIn})`,
    maskRepeat: 'no-repeat',
    maskSize: 'contain',
    maskPosition: 'center'
  }}
 className={`w-4 h-4 ${
    completedIds.includes(l.id)? 'bg-green-500' : // אם יש לך שדה כזה בנתונים
    isActive ? 'bg-orange-500' :      // מי שאני עומדת עליו (למשל כתום)
    'bg-slate-400'                   // כל השאר (אפור)
  }`}
/>)}
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className={`text-sm truncate ${isActive ? "font-semibold text-[#FA8072]" : "text-slate-700"}`}>
                    {l.idx}. {l.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{formatDuration(l.durationSec)}</span>
                    {l.isFree && <span className="text-xs text-green-500 font-medium">• חינמי</span>}
                  </div>
                </div>
                {!l.isFree && !isActive && <Lock className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </aside>
      const component = (() => {
  const Component = ComponentMap[lesson.type.name];
  return Component ? (
    <Component content={lesson.content} name={lesson.name} />
  ) : (
    <div>סוג תוכן לא נתמך</div> // ברירת מחדל אם ה-ID לא קיים במילון
  );
})()

const notEnroll = 
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl overflow-hidden relative">
      {/* רקע דקורטיבי עדין */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FA8072] to-[#40E0D0]" />
      
      <div className="bg-white p-10 shadow-xl rounded-2xl max-w-md w-full text-center flex flex-col items-center">
        {/* אייקון מנעול מעוצב */}
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-slate-200">
          <Lock className="w-10 h-10 text-[#40E0D0]" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-3">התוכן נעול</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          שיעור זה זמין באופן בלעדי לתלמידי הקורס 
          <br />
        </p>

        {/* כפתורי פעולה */}
        <div className="w-full space-y-4">
          <button
            onClick={() => navigate(`/${Paths.courseView}/${courseId}`)}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all transform hover:scale-[1.02]"
          >
            <ShoppingCart className="w-5 h-5 text-[#FA8072]" />
            הרשמה לקורס
          </button>

          <button
            onClick={() => navigate(`/${Paths.home}`)}
            className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-900 py-2 text-sm font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לרשימת הקורסים
          </button>
        </div>

        {/* Footnote אבטחה */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#40E0D0]" />
          <span>תשלום מאובטח ב-100% וגישה מיידית</span>
        </div>
      </div>
      
      {/* אלמנט עיצובי מטושטש בצדדים */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#40E0D0]/10 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FA8072]/10 rounded-full blur-3xl" />
    </div>
const banner =
    <div className="w-full mb-6 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-4 p-5 relative">
        
        {/* אלמנט עיצובי בצד - פס צבעוני דק */}
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#40E0D0] to-[#FA8072]" />

        {/* אייקון מתנה/שיעור חופשי */}
        <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
          <Gift className="w-6 h-6 text-[#40E0D0]" />
        </div>

        {/* טקסטים */}
        <div className="flex-grow text-right">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#40E0D0]/10 text-[#2db4a7] border border-[#40E0D0]/20">
              שיעור פתוח לכולם
            </span>
            <span className="text-slate-400 text-xs">•</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            {lesson.name}
          </h2>
        </div>

        {/* כפתור/Badge של צפייה */}
        <div className="flex-shrink-0 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
          <div className="text-left">
            <p className="text-[10px] text-slate-400 font-medium leading-none">סטטוס צפייה</p>
            <p className="text-xs font-bold text-slate-700">גישה חופשית</p>
          </div>
          <PlayCircle className="w-5 h-5 text-slate-400" />
        </div>
      </div>
      
      {/* הודעת הסבר קטנה בתחתית ה-Div */}
      <div className="bg-slate-50/50 px-5 py-2 flex items-center gap-2 border-t border-slate-100">
        <Info className="w-3.5 h-3.5 text-slate-400" />
        <p className="text-xs text-slate-500">
          זהו שיעור דוגמה מתוך הקורס המלא. כדי לצפות בכל התכנים יש להירשם לקורס.
        </p>
      </div>
    </div>

  return (
    <div>
{(!isAlreadyEnrolled)&&banner}
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row" dir="rtl">
      
      {/* Sidebar - רשימת שיעורים */}
      
      {aside}
      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* כותרת שיעור */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 overflow-hidden">
  <img 
    src={lesson.type.displayIcon ? `${BASE_URL}${lesson.type.displayIcon}` : fillIn}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = fillIn;
    }} 
    alt="icon"
    className="w-full h-full object-contain p-1.5 grayscale" 
  />
</div>
            <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full`}>
              {config.displayName}
            </span>
            {lesson.isFree && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">חינמי</span>}
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{lesson.idx}. {lesson.name}</h1>
          <div className="flex items-center gap-1 mt-1 text-slate-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(lesson.durationSec)}</span>
          </div>
        </div>

        {isAvilable? component : notEnroll}
        {/* ניווט קודם/הבא */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => prevLesson && setLessonId(prevLesson.id)}
            disabled={!prevLesson}
            className="gap-2 rounded-xl"
          >
            <ChevronRight className="w-4 h-4" />
            שיעור קודם
          </Button>
          <span className="text-sm text-slate-400">{lesson.idx} / {lessons.length}</span>
          <Button
            onClick={() => {
              if (!completedIds.includes(lesson.id)) setCompletedIds(prev => [...prev, lesson.id]);
            }}
            className="gap-2 rounded-xl bg-gradient-to-r from-[#FA8072] to-[#40E0D0] text-white"
          >
            סיימתי את השיעור
          </Button>
          
          <Button
           variant="outline"
            onClick={() => {
              if (nextLesson) setLessonId(nextLesson.id);
            }}
            disabled={!nextLesson}
            className="gap-2 rounded-xl"
          >
            שיעור הבא
            <ChevronLeft className="text-sm text-slate-400" />
          </Button>
        </div>
      </main>
    </div>
    </div>
  );
}