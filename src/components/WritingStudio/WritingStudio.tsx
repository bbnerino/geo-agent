"use client";
import { useWritingStudioStore } from "@/store/writingStudio";
import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import MiniIdeaLab from "./MiniIdeaLab";

const WritingStudio = () => {
  const { content, setContent, setSelectedSentence } = useWritingStudioStore();
  const [showEditButton, setShowEditButton] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const debouncedSetButton = useCallback(
    debounce((selection: string, x: number, y: number) => {
      setSelectedSentence(selection);
      setButtonPosition({ x, y: y - 30 });
      setShowEditButton(true);
    }, 300),
    []
  );

  const handleTextSelection = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    if (!selection.trim() || selection.length < 5) {
      setShowEditButton(false);
      return;
    }

    debouncedSetButton(selection, e.clientX, e.clientY);
  };

  const handleEditClick = () => {
    setShowPopup(true);
    setShowEditButton(false);
  };

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
        .edit-button {
          position: fixed;
          transform: translateX(-50%);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          z-index: 50;
          background-color: #ce85ffd6;
        }
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 90;
        }
      `}</style>
      <div className="content-container-header h-[60px]">
        <h1>Writing Studio</h1>
      </div>

      <div className="p-4">
        <textarea
          className="writing-studio-textarea w-full h-[calc(100vh-180px)] resize-none focus:outline-purple-100 p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onMouseUp={handleTextSelection}
          placeholder="# 제목을 입력하세요"
        />
      </div>

      {showEditButton && (
        <button
          className="edit-button"
          style={{ top: `${buttonPosition.y}px`, left: `${buttonPosition.x}px` }}
          onClick={handleEditClick}
        >
          편집
        </button>
      )}

      <MiniIdeaLab position={buttonPosition} open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default WritingStudio;
