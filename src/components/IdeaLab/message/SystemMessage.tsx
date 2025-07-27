import ApplyContent from "./ApplyContent";

const SystemMessage = ({
  role = "assistant",
  message = "",
  author = ""
}: {
  role?: "user" | "assistant" | "system";
  message?: string;
  author?: string;
}) => {
  const mapRole = {
    user: "User",
    assistant: "Assistant",
    system: "System",
    function_call: "Function Call",
    function_call_output: "Function Call Output"
  };

  //    ``` ``` 영역 background 컬러 변경
  let processedMessage = message?.replace(/\n/g, "<br />");

  processedMessage = processedMessage?.replace(
    /```(.*?)```/g,
    `<div class="bg-gray-100 p-2 rounded-md"><p class="text-sm text-gray-500">Code</p>$1</div>`
  );

  const mapAuthor = {
    marketer_agent: "기획자",
    data_analyst_agent: "데이터 분석가",
    content_reviewer_agent: "콘텐츠 감수관",
    persona_builder_agent: "고객 분석가",
    content_writer_agent: "콘텐츠 작성자",
    seo_optimizer_agent: "검색엔진 전략가",
    trend_researcher_agent: "트렌드 연구원",
    strategy_planner_agent: "전략 기획자"
  };

  processedMessage = processedMessage?.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  if (role === "system") return null;
  return (
    <div className="w-full flex justify-start">
      <div
        className={`flex flex-col border border-transparent p-2 gap-2 cursor-pointer hover:box-shadow-md max-w-xl break-words rounded-md bg-gray-100 pr-10`}
      >
        <div className={`text-sm text-gray-500 font-bold`}>
          {mapRole[role]}
          {author && (
            <span className="text-blue-400 text-xs font-normal bg-blue-100 rounded-lg px-2 py-1 ml-2 font-semibold">
              {mapAuthor[author] || author}
            </span>
          )}
        </div>
        <div
          className="text-sm break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: processedMessage }}
        />
        {author === "content_writer_agent" && <ApplyContent content={message} />}
      </div>
    </div>
  );
};

export default SystemMessage;
