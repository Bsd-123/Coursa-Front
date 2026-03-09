import { useEffect, useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import type { PdfViewerProps } from "./PdfViewer";

export type Question = {
  question: string;
  options: string[]; // שיניתי מ-[] ל-string[]
  correct: number;
};

export default function QuizViewer({ content, name }: PdfViewerProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!content) return;

    fetch(`${content}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
        setLoading(false);
      });
  }, [content]);

  // פונקציות עזר
  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = questions.filter((q, i) => answers[i] === q.correct).length;

  if (loading) return <div className="p-10 text-center text-slate-500">טוען שאלות...</div>;
  if (questions.length === 0) return <div className="p-10 text-center text-red-400">לא נמצאו שאלות בניתוב זה.</div>;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">{name}</h2>
        {submitted && (
          <Button variant="outline" size="sm" onClick={reset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            נסה שוב
          </Button>
        )}
      </div>

      {submitted && (
        <div className={`rounded-xl p-4 text-center ${score === questions.length ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
          <p className="text-2xl font-bold">{score}/{questions.length}</p>
          <p className="text-sm mt-1">{score === questions.length ? "מושלם! כל התשובות נכונות 🎉" : "כמעט! נסה שוב"}</p>
        </div>
      )}

      {questions.map((q, qIdx) => (
        <div key={qIdx} className="space-y-3">
          <p className="font-semibold text-slate-800">{qIdx + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oIdx) => {
              const isSelected = answers[qIdx] === oIdx;
              const isCorrect = q.correct === oIdx;
              
              let cls = "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ";
              if (!submitted) {
                cls += isSelected ? "border-[#FA8072] bg-[#FA8072]/5" : "border-slate-200 hover:border-slate-300";
              } else {
                if (isCorrect) cls += "border-green-500 bg-green-50";
                else if (isSelected && !isCorrect) cls += "border-red-400 bg-red-50";
                else cls += "border-slate-200 opacity-60";
              }

              return (
                <div key={oIdx} className={cls} onClick={() => handleSelect(qIdx, oIdx)}>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${isSelected && !submitted ? "border-[#FA8072] bg-[#FA8072]" : "border-slate-300"}`} />
                  <span className="text-slate-700 text-sm">{opt}</span>
                  {submitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 mr-auto" />}
                  {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 mr-auto" />}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <Button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full bg-gradient-to-r from-[#FA8072] to-[#40E0D0] text-white rounded-xl py-6 text-lg font-bold"
        >
          הגש תשובות
        </Button>
      )}
    </div>
  );
}