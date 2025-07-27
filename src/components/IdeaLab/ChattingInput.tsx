import { useRef, useEffect } from "react";

export default function ChattingInput({
  inputValue,
  onChange,
  onSubmit
}: {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // 높이를 초기화
      textareaRef.current.style.height = "auto";
      // 스크롤 높이로 설정
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  return (
    <div className="p-2 relative">
      <style jsx>{`
        .chatting-input {
          width: 100%;
          padding: 12px;
          padding-right: 30px;
          min-height: 60px;
          max-height: 200px;
          border: 1px solid #8F9298;
          border-radius: 8px;
          resize: none;
          overflow-y: auto;
        }
        .chatting-input:focus {
          outline: none;
        }
        .chatting-input::-webkit-scrollbar {
          width: 3px;
        }
        .chatting-input::-webkit-scrollbar-thumb {
          background-color: #e0e0e0;
          border-radius: 4px;
        }
        .chatting-input::-webkit-scrollbar-track {
          background-color: #f0f0f0;
        }
      `}</style>
      <textarea
        ref={textareaRef}
        className="chatting-input"
        value={inputValue}
        onChange={onChange}
        placeholder="입력을 시작하세요..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit?.();
          }
        }}
      />
      {onSubmit && (
        <div
          className="absolute bottom-9 right-4 flex items-center rounded-full bg-green-300 w-8 h-8 justify-center hover:bg-green-400 cursor-pointer"
          onClick={onSubmit}
        >
          ⬆
        </div>
      )}
    </div>
  );
}
