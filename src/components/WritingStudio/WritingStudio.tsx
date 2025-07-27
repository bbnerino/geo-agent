"use client";
import { useWritingStudioStore } from "@/store/writingStudio";
import React, { useState } from "react";
import PopupIdeaLab from "./PopupIdeaLab";

const WritingStudio = () => {
  const { content, setContent } = useWritingStudioStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="content-container content-container-main h-full">
      <style jsx>{`
        .writing-studio-textarea::-webkit-scrollbar {
          width: 4px;
        }
        .writing-studio-textarea::-webkit-scrollbar-thumb {
          background-color: #e3e9ff49;
          border-radius: 10px;
        }
      `}</style>
      <div className="content-container-header h-[60px]">
        <h1>Writing Studio</h1>
      </div>

      <div className="p-4">
        <textarea
          className="writing-studio-textarea w-full h-[calc(100vh-180px)] resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="# 제목을 입력하세요"
        />
      </div>

      <PopupIdeaLab open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default WritingStudio;
