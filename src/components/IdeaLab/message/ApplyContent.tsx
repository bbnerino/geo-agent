import { useWritingStudioStore } from "@/store/writingStudio";
import React from "react";

const ApplyContent = ({ content }: { content: string }) => {
  const { applyContent } = useWritingStudioStore();
  return (
    <div className="w-full flex justify-end">
      <div
        className="py-1 px-4 bg-blue-100 rounded-md text-blue-500 font-semibold cursor-pointer hover:bg-blue-200"
        onClick={() => applyContent(content)}
      >
        적용
      </div>
    </div>
  );
};

export default ApplyContent;
