import { BASE_URL } from '../../App';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// הגדרת ה-Worker בצורה תקינה
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export type PdfViewerProps = {
  content: string; // זה ה-URL של הקובץ שמגיע מה-Backend
  name?: string;
}

// שינוי שם המשתנה ל-content כדי שיתאים למה שנשלח מהאב
function PdfViewer({ content }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div 
        className="relative shadow-2xl border border-gray-200" 
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none' }}
      >
        {/* שים לב: כאן ה-file מקבל את ה-content */}
        <Document 
          file={`${BASE_URL}${content}`} 
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("שגיאה בטעינת PDF:", error)}
          loading={<p>טוען מסמך...</p>}
        >
          <Page 
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={1.2} 
          />
        </Document>
        
        {/* שכבת הגנה שקופה מעל הקנווס */}
        <div className="absolute inset-0 z-50 pointer-events-none" />
      </div>

      {/* בקרה על הדפים - יוצג רק אם יש יותר מדף אחד */}
      {numPages > 1 && (
        <div className="flex gap-4 mt-6 items-center bg-white p-3 rounded-lg shadow-md">
          <button 
            disabled={pageNumber <= 1} 
            onClick={() => setPageNumber(prev => prev - 1)}
            className="px-4 py-2 bg-slate-800 text-white rounded-md disabled:bg-gray-300 transition-colors"
          >
            הקודם
          </button>
          
          <span className="text-sm font-medium">
            דף {pageNumber} מתוך {numPages}
          </span>
          
          <button 
            disabled={pageNumber >= numPages} 
            onClick={() => setPageNumber(prev => prev + 1)}
            className="px-4 py-2 bg-slate-800 text-white rounded-md disabled:bg-gray-300 transition-colors"
          >
            הבא
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;