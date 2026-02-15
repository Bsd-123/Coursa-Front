export type Skill = {
    id: number;
    name: string;
    image?: string; // לטובת הצגת ה-Base64 מהשרת
    fileImage?: File | null; // לטובת בחירת קובץ חדש מהמחשב ושליחה לשרת
}