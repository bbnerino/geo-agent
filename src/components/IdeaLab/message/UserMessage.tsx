const UserMessage = ({ message = "" }: { message?: string }) => {
  let processedMessage = message?.replace(/\n/g, "<br />");

  processedMessage = processedMessage?.replace(
    /```(.*?)```/g,
    `<div class="bg-gray-100 p-2 rounded-md"><p class="text-sm text-gray-500">Code</p>$1</div>`
  );

  processedMessage = processedMessage?.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  return (
    <div className="w-full flex justify-end">
      <div
        className={`flex flex-col border border-transparent p-2 gap-2 cursor-pointer hover:box-shadow-md max-w-xl break-words rounded-md bg-blue-50 pr-10`}
      >
        <div className={`text-sm text-blue-500 font-bold`}>User</div>
        <div
          className="text-sm break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: processedMessage }}
        />
      </div>
    </div>
  );
};

export default UserMessage;
