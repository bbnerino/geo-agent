import React, { useEffect, useState } from "react";
import ApplyContent from "./ApplyContent";

const ContentWriter = ({ message }: { message: string }) => {
  console.log("🔵", message);
  //   const [result, setResult] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    try {
      //   const { result, content } = JSON.parse(message);
      //   setResult(result.replace(/\n/g, "<br />"));
      setContent(message.replace(/\n/g, "<br />"));
    } catch (error) {
      console.log("🔴🔴🔴🔴🔴", error);
    }
  }, [message]);

  return (
    <div className="w-full flex justify-start">
      <div
        className={`flex flex-col border border-transparent p-2 gap-2 cursor-pointer hover:box-shadow-md max-w-xl break-words rounded-md bg-gray-100 pr-10`}
      >
        <div className={`text-sm text-gray-500 font-bold`}>
          Assistant
          <span className="text-blue-400 text-xs font-normal bg-blue-100 rounded-lg px-2 py-1 ml-2 font-semibold">
            콘텐츠 작성자
          </span>
        </div>

        {/* <div
          className="text-sm break-words whitespace-pre-line bg-purple-50 p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: result }}
        ></div> */}

        <div className="text-sm break-words whitespace-pre-line" dangerouslySetInnerHTML={{ __html: content }} />
        <ApplyContent content={content} />
      </div>
    </div>
  );
};

export default ContentWriter;
