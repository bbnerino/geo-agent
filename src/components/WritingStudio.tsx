"use client";

import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const WritingStudio = () => {
  const [content, setContent] = useState("");

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
          placeholder="# 제목을 입력하세요"
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
