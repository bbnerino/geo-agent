import { PromptRequest } from "@/utils/gpt/request";
import { GET_FILE_DESCRIPTION_PROMPT } from "./prompt";

export const getFileDescription = async (file: File) => {
  let fileText = "";
  try {
    if (file.type === "application/pdf") {
      // fileText = await pdfToText(file);
    }
    fileText = await file.text();
    // md 파일, text 파일 텍스트 파일로 변환

    const promptRequest = new PromptRequest({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: fileText
        }
      ],
      systemPrompt: GET_FILE_DESCRIPTION_PROMPT,
      isReActMode: false
    });

    const response = await promptRequest.request();
    return response.messages[response.messages.length - 1].content;

  } catch (error) {
    console.error(error);
  }
};
