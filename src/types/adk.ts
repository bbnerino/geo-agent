export interface AdkResponse {
  session_id: string;
  messages: MessageResponse[];
}

interface MessageResponse {
  content: {
    parts: Part[];
  };
  usage_metadata?: UsageMetadata;
  invocation_id?: string;
  author?: string;
  actions?: Action;
  long_running_tool_ids?: LongRunningToolId[];
  id: string;
  timestamp: number;
}

interface Part {
  functionCall?: {
    id: string;
    args: Record<string, unknown>;
    name: string;
  };
  functionResponse?: {
    id: string;
    name: string;
    response: {
      result: Record<string, unknown>;
      name: string;
      action: string;
      content: string;
    };
  };
  text?: string;
  role: string;
}

interface UsageMetadata {
  candidates_token_count: number;
  candidates_tokens_details: { modality: string; token_count: number }[];
  prompt_token_count: number;
  prompt_tokens_details: { modality: string; token_count: number }[];
  thoughts_token_count: number;
  total_token_count: number;
  traffic_type: string;
}

interface Action {
  state_delta: Record<string, unknown>;
  artifact_delta: Record<string, unknown>;
  requested_auth_configs: Record<string, unknown>;
}

interface LongRunningToolId {
  id: string;
  name: string;
}
