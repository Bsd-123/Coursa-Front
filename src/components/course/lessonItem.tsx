import { Clock } from "lucide-react";
import type { Lesson } from "../../types/lesson.types";
import { Paths } from "../../routes/paths";
import { BASE_URL } from "../../App";
import fillIn from '../../assets/fillIn.png'

type LessonProp={
    lesson: Lesson
}

export default function LessonItem({ lesson }:LessonProp) {
  const config = lesson.type

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group cursor-pointer border border-transparent hover:border-slate-100">
      {/* מספר שיעור */}
      <span className="w-6 text-sm text-slate-400 text-center font-medium flex-shrink-0">
        {lesson.idx}
      </span>

      {/* אייקון סוג */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
        <img 
  src={lesson.type.displayIcon ? `${BASE_URL}${lesson.type.displayIcon}` : fillIn}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = fillIn; // אם הלינק מהשרת שבור, שים את תמונת המילוי
  }}
                    alt="icon" className="w-full h-full object-contain p-1" />
      </div>

      {/* שם שיעור */}
      <div className="flex-1 min-w-0">
      <a href = {`/${Paths.lessonPage}/${lesson.course.id}/${lesson.id}`} className="font-medium text-slate-800 truncate group-hover:text-[#FA8072] transition-colors">
        {lesson.name}
      </a>
      <div className="flex items-center gap-2 mt-1 flex-wrap">
        {/* חינמי */}
        {lesson.isFree && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
            חינמי
          </span>
        )}
      </div>
      </div>

      {/* סוג */}
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0`}>
      {config.displayName}
      </span>

      {/* אורך */}
      <div className="flex items-center gap-1 text-sm text-slate-500 flex-shrink-0 min-w-[60px] justify-end">
      <Clock className="w-4 h-4" />
      <span>{Math.floor(lesson.durationSec / 60)}:{String(lesson.durationSec % 60).padStart(2, '0')}</span>
      </div>
    </div>
  );
}