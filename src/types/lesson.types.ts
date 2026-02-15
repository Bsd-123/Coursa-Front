import type { ContentType } from "./contentType.types";
import type { Course } from "./course.types";

export type Lesson = {
    id: number;
    idx: number;
    name: string;
    content: string;
    mimeType: string;
    isFree: boolean;
    status: boolean | null; 
    course: Course; 
    type: ContentType;
}