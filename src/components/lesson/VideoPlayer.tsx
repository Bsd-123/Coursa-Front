import type { PdfViewerProps } from "./PdfViewer";

export default function VideoPlayer({ content }:PdfViewerProps) {
    
  return (
    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
      <video
        key={content}
        {...{ referrerPolicy: "no-referrer" }}
        controls
        src={content}
        className="w-full h-full"
        /*poster="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800"*/
      >
        <p className="text-white text-center p-8">הדפדפן שלך אינו תומך בנגן וידאו.</p>
      </video>
    </div>
  );
}