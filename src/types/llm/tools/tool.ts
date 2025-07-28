import { airconFunctionData, handleAircon } from "./aircon";

export interface Tool {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: unknown;
  };
}

export interface ToolCall {
  id: string;
  call_id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface ToolFunctionData {
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

export const toolExecute = {
  handleAircon
} as {
  [key: string]: (...args: unknown[]) => Promise<unknown>;
};

export const tools = ["handleAircon"];
