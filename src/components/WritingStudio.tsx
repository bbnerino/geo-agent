"use client";

import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

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

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();

      // 에디터의 change 이벤트 리스너 추가
      editorInstance.on("change", () => {
        const markdown = editorInstance.getMarkdown();
        setContent(markdown);
      });
    }
  }, []);

  return (
    <div className="content-container content-container-main lg:flex-[2] h-full">
      <div className="content-container-header">
        <h1>Writing Studio</h1>
      </div>
      <div className="bg-white">
        <Editor
          height="calc(100vh - 180px)"
          ref={editorRef}
          initialValue={content}
          initialEditType="markdown"
          useCommandShortcut={true}
          hideModeSwitch={true}
          events={{
            change: () => {
              if (editorRef.current) {
                const markdown = editorRef.current.getInstance().getMarkdown();
                setContent(markdown);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default WritingStudio;
