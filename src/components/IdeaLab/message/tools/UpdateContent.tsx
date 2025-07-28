import React from "react";
import { useWritingStudioStore } from "@/store/writingStudio";

const UpdateContent = ({ message }: { message: string }) => {
  const { applyContent } = useWritingStudioStore();

  return (
    <div className="w-full flex justify-start">
      <div className={`pt-2 cursor-pointer hover:box-shadow-md max-w-xl break-words rounded-md`}>
        <div
          className="py-1 px-4 bg-purple-100 rounded-md text-purple-500 font-semibold cursor-pointer hover:bg-purple-200"
          onClick={() => applyContent(message)}
        >
          적용하기
        </div>
      </div>
    </div>
  );
};

export default UpdateContent;
