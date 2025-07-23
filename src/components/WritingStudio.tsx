'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const WritingStudio = () => {
  const [content, setContent] = useState(`# 제목 1

이것은 **굵은 글씨**와 *기울임 글씨*를 포함한 일반 텍스트입니다.

## 제목 2

노션 스타일의 인라인 편집기입니다. 제목에 커서를 올리면 편집 모드로 전환됩니다.

- 목록 항목 1
- 목록 항목 2

### 제목 3

코드 블록도 지원합니다:

\`\`\`
console.log('Hello World');
\`\`\``);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  const handleSave = () => {
    setContent(editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.metaKey) {
      handleSave();
    }
  };

  return (
    <div className="content-container content-container-main lg:flex-[2]">
      <div className="content-container-header">
        <h1>Writing Studio</h1>
      </div>
      <div className="p-4">
        {/* 간단한 툴바 */}
        <div className="border-b border-gray-200 pb-4 mb-4 flex flex-wrap gap-2">
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            굵게
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            기울임
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            H1
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            H2
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            목록
          </button>
        </div>

        {/* 노션 스타일 에디터 */}
        <div className="border rounded-lg bg-white min-h-[500px]">
          {isEditing ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">편집 모드</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    저장 (⌘+Enter)
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    취소 (Esc)
                  </button>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={editContent}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown}
                className="w-full h-96 p-4 resize-none focus:outline-none font-mono text-sm border rounded"
                placeholder="여기에 마크다운을 작성하세요..."
              />
            </div>
          ) : (
            <div 
              className="p-4 cursor-text"
              onClick={handleEditClick}
            >
              <div className="markdown-preview">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  편집하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingStudio;
