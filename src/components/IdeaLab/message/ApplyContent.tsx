import { useWritingStudioStore } from "@/store/writingStudio";
import React from "react";

const ApplyContent = ({ content }: { content: string }) => {
  const { applyContent } = useWritingStudioStore();
  return (
    <div className="w-full flex justify-end">
      <div
        className="py-1 px-4 bg-purple-100 rounded-md text-purple-500 font-semibold cursor-pointer hover:bg-purple-200"
        onClick={() => applyContent(content)}
      >
        적용하기
      </div>
    </div>
  );
};

export default ApplyContent;
