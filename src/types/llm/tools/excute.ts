export const tools: ToolFunctionData[] = [];

export const toolExecute = {} as {
  [key: string]: (...args: unknown[]) => Promise<unknown>;
};
interface ToolFunctionData {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: {
        [key: string]: {
          type: string;
          description: string;
        };
      };
      required: string[];
    };
  };
}
