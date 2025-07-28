import { AUTHOR_MAP } from "@/utils/agents";
import UpdateContent from "./tools/UpdateContent";

const ToolMessage = ({ message = "", author = "" }: { message?: string; author?: string }) => {
  //    ``` ``` 영역 background 컬러 변경
  let processedMessage = message?.replace(/\n/g, "<br />");

  processedMessage = processedMessage?.replace(
    /```(.*?)```/g,
    `<div class="bg-gray-100 p-2 rounded-md"><p class="text-sm text-gray-500">Code</p>$1</div>`
  );

  processedMessage = processedMessage?.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  if (author === "update_content") {
    return <UpdateContent message={message} />;
  }
  return (
    <div className="w-full flex justify-start">
      <div
        className={`flex flex-col border border-transparent p-2 gap-2 cursor-pointer hover:box-shadow-md max-w-xl break-words rounded-md bg-gray-100 pr-10`}
      >
        <div className={`text-sm text-gray-500 font-bold`}>
          Tool
          {author && (
            <span className="text-blue-400 text-xs font-normal bg-blue-100 rounded-lg px-2 py-1 ml-2 font-semibold">
              {AUTHOR_MAP[author] || author}
            </span>
          )}
        </div>
        <div
          className="text-sm break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: processedMessage }}
        />
      </div>
    </div>
  );
};

export default ToolMessage;
