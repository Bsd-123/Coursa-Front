import type {User} from '../types/user.types'
import type {Lesson} from '../types/lesson.types'
export type Progress = {
    userId: number;
    lessonId: number;
    seconds: number;
    lastView?: Date | string | null; // DateTime ב-C# יכול להגיע כ-string ב-JSON
    lesson?: Lesson; 
    user?: User;
};