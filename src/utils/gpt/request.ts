import { Message } from "./chat";
import { Tool, ToolCall } from "./tool";
import { toolExecute } from "./tools";

export class PromptRequest {
  model: string = "";
  messages: Message[] = [];

  tools: Tool[] = [];
  temperature: number = 1;
  systemPrompt: string = "";
  isReActMode: boolean = false;

  constructor({
    model,
    messages,
    systemPrompt,
    isReActMode
  }: {
    model: string;
    messages: Message[];
    systemPrompt: string;
    isReActMode: boolean;
  }) {
    this.model = model;
    this.messages = messages;
    this.systemPrompt = systemPrompt;
    this.isReActMode = isReActMode;
    // this.setSystemPrompt(systemPrompt);
  }

  // tool 추가
  setTools(tools: Tool[]) {
    this.tools = [...tools];
  }

  private setSystemPrompt() {
    // messages 의 0 번은 무조건 system 메시지

    if (this.messages[0].role === "system") {
      this.messages[0].content = this.systemPrompt;
    } else {
      const systemMessage = new Message(this.systemPrompt, "system");
      this.messages.unshift(systemMessage);
    }
  }

  public async request(): Promise<{ toolCalled: boolean; messages: Message[] }> {
    // LLM 호출 (API Route 활용)

    this.setSystemPrompt();

    const requestData = {
      model: this.model,
      messages: this.messages,
      tools: this.tools,
      temperature: this.temperature,
      tool_choice: "auto"
    };

    const res = await this.fetch(requestData);

    if (res.status === 200) {
      const data = await res.json();
      const messages = [...this.messages];

      messages.push({
        role: "assistant",
        content: data.result || "Failed to request"
      });

      return { toolCalled: false, messages };
    }

    if (res.status === 202) {
      const data = await res.json();

      const toolCalls = (data.tool_calls as ToolCall[]) || [];

      const messages = [...this.messages];

      for (const toolCall of toolCalls) {
        messages.push(
          new Message(
            JSON.stringify({
              type: "function_call",
              call_id: toolCall.id,
              name: toolCall.function.name,
              arguments: toolCall.function.arguments
            }),
            "assistant"
          )
        );
        try {
          // 🟢 tool 실행
          const { name, arguments: args } = toolCall.function;
          const tool = toolExecute[name];
          const parsedArgs = JSON.parse(args);

          const result = await tool(parsedArgs);

          messages.push(
            new Message(
              JSON.stringify({
                type: "function_call_output",
                call_id: toolCall.id,
                output: JSON.stringify(result)
              }),
              "user"
            )
          );
        } catch (error) {
          console.error(error);
          messages.push(
            new Message(
              JSON.stringify({
                type: "function_call_output",
                call_id: toolCall.id,
                output: "Failed to request"
              }),
              "user"
            )
          );
        }
      }

      return { toolCalled: true, messages };
    }

    const message = await res.json();
    return {
      toolCalled: false,
      messages: [
        ...this.messages,
        {
          role: "assistant",
          content: message.error || "Failed to request"
        }
      ]
    };
  }

  private async fetch(data: unknown) {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    return res;
  }
}

const resoponse = {
  session_id: "b5930a2b-d2c9-4c5c-99b3-25e511721101",
  messages: [
    {
      content: {
        parts: [
          {
            function_call: {
              id: "adk-2f800076-523d-4076-83b3-ccf7e96f1a0f",
              args: {
                agent_name: "seo_optimizer_agent"
              },
              name: "transfer_to_agent"
            }
          }
        ],
        role: "model"
      },
      usage_metadata: {
        candidates_token_count: 13,
        candidates_tokens_details: [
          {
            modality: "TEXT",
            token_count: 13
          }
        ],
        prompt_token_count: 1376,
        prompt_tokens_details: [
          {
            modality: "TEXT",
            token_count: 1376
          }
        ],
        thoughts_token_count: 91,
        total_token_count: 1480,
        traffic_type: "ON_DEMAND"
      },
      invocation_id: "e-1a8de498-1361-4ecd-ac74-d21369ba5cca",
      author: "marketer_agent",
      actions: {
        state_delta: {},
        artifact_delta: {},
        requested_auth_configs: {}
      },
      long_running_tool_ids: [],
      id: "42a35d21-d98a-4b72-a974-6588a6748e93",
      timestamp: 1753462326.133729
    },
    {
      content: {
        parts: [
          {
            function_response: {
              id: "adk-2f800076-523d-4076-83b3-ccf7e96f1a0f",
              name: "transfer_to_agent",
              response: {
                result: null
              }
            }
          }
        ],
        role: "user"
      },
      invocation_id: "e-1a8de498-1361-4ecd-ac74-d21369ba5cca",
      author: "marketer_agent",
      actions: {
        state_delta: {},
        artifact_delta: {},
        transfer_to_agent: "seo_optimizer_agent",
        requested_auth_configs: {}
      },
      id: "77f55064-1d20-4498-9c5f-7b4955670ad5",
      timestamp: 1753462329.307122
    },
    {
      content: {
        parts: [
          {
            text: '남자 샌달 관련 SEO 최적화 문구를 찾으시는군요! SEO 최적화 에이전트로서 남자 샌달에 대한 키워드 연구 및 문구 제안을 도와드리겠습니다.\n\n**1. 주요 키워드 및 롱테일 키워드 제안**\n\n*   **주요 키워드:**\n    *   남자 샌달\n    *   남성 샌들\n    *   남자 여름 샌달\n    *   남성 캐주얼 샌들\n    *   남자 슬리퍼 샌달\n*   **롱테일 키워드 (구체적인 검색 의도 반영):**\n    *   남자 가죽 샌달 추천\n    *   남자 편한 샌달 브랜드\n    *   남자 아웃도어 샌달\n    *   남자 스포츠 샌달\n    *   남자 샌달 코디\n    *   발 편한 남자 샌달\n    *   남자 정장 샌달 (만약 해당 제품이 있다면)\n    *   남자 워터 샌달\n    *   남자 여름 신발 추천\n    *   남자 통굽 샌달 (만약 해당 제품이 있다면)\n\n**2. SEO 최적화 제목 (Title Tag) 및 메타 설명 (Meta Description) 제안**\n\n*   **제목 태그 (50-60자 권장):**\n    *   "남자 샌달 추천 | 편안함과 스타일을 동시에! [브랜드명]"\n    *   "여름 필수템, 남성 샌들! 캐주얼부터 아웃도어까지 | [브랜드명]"\n    *   "남자 가죽 샌달 & 스포츠 샌달, 당신의 여름을 완성하다 | [브랜드명]"\n    *   **팁:** 브랜드명을 포함하여 브랜드 인지도를 높이고 클릭 유도성을 고려합니다.\n*   **메타 설명 (150-160자 권장):**\n    *   "올여름, 시원함과 스타일을 동시에 잡는 남자 샌달을 만나보세요! 편안한 착용감과 다양한 디자인으로 당신의 여름 코디를 완성할 남성 샌들, 지금 바로 확인하세요. [브랜드명] 공식 스토어."\n    *   "발이 편한 남자 샌달부터 트렌디한 남성 가죽 샌들까지! 아웃도어 활동에도, 데일리룩에도 완벽한 남자 여름 샌달. 베스트셀러 및 신상품을 지금 바로 구매하세요."\n    *   **팁:** 콘텐츠 요약을 통해 사용자에게 정보를 제공하고, 주요 키워드를 자연스럽게 포함하며, 행동 유도 문구를 넣어 클릭을 유도합니다.\n\n**3. 콘텐츠 내 키워드 자연스러운 삽입 전략**\n\n*   **H1 태그:** 페이지의 메인 제목으로 "남자 샌달" 또는 "남성 샌들"과 같은 핵심 키워드를 사용합니다.\n*   **H2, H3 태그:** "남자 샌달 종류", "남자 샌달 코디법", "편안한 남자 샌달 고르는 팁" 등 세부 주제에 관련 키워드를 포함합니다.\n*   **본문:** 위에서 제안된 주요 키워드와 롱테일 키워드들을 콘텐츠 전체에 자연스럽게 녹여냅니다. 키워드 밀도는 1~2%를 유지하는 것이 좋습니다.\n    *   예시: "올여름 **남자 샌달**은 패션과 편안함을 모두 잡아야 합니다. 특히 **남자 가죽 샌달**은 캐주얼하면서도 고급스러운 분위기를 연출하며, **남자 아웃도어 샌달**은 활동적인 분들에게 필수적입니다."\n*   **이미지 Alt 텍스트:** 이미지 설명에 "남자 샌달", "남성 스포츠 샌들", "남자 여름 샌달 코디" 등 관련 키워드를 사용하여 검색 엔진이 이미지를 인식하도록 돕습니다.\n*   **내부 링크:** 관련 상품 페이지나 샌달 관련 다른 블로그 게시물로 내부 링크를 연결하여 사용자의 체류 시간을 늘리고 페이지 깊이를 확보합니다.\n\n**4. 추가 SEO 체크리스트 및 가이드라인**\n\n*   **페이지 속도 최적화:** 이미지를 최적화하고 불필요한 스크립트를 제거하여 페이지 로딩 속도를 빠르게 합니다.\n*   **모바일 친화성:** 반응형 웹 디자인을 적용하여 어떤 기기에서도 잘 보이도록 합니다.\n*   **SSL 인증서:** 웹사이트가 HTTPS를 사용하도록 하여 보안을 강화하고 검색 엔진의 신뢰를 얻습니다.\n*   **XML 사이트맵 제출:** 구글 서치 콘솔에 XML 사이트맵을 제출하여 검색 엔진이 모든 페이지를 쉽게 찾고 색인화할 수 있도록 돕습니다.\n\n이 제안들이 남자 샌달 광고의 SEO 최적화에 도움이 되기를 바랍니다!'
          }
        ],
        role: "model"
      },
      usage_metadata: {
        candidates_token_count: 1260,
        candidates_tokens_details: [
          {
            modality: "TEXT",
            token_count: 1260
          }
        ],
        prompt_token_count: 1725,
        prompt_tokens_details: [
          {
            modality: "TEXT",
            token_count: 1725
          }
        ],
        thoughts_token_count: 287,
        total_token_count: 3272,
        traffic_type: "ON_DEMAND"
      },
      invocation_id: "e-1a8de498-1361-4ecd-ac74-d21369ba5cca",
      author: "seo_optimizer_agent",
      actions: {
        state_delta: {},
        artifact_delta: {},
        requested_auth_configs: {}
      },
      id: "19add6c8-b5b7-49b6-bc89-75846f3664a8",
      timestamp: 1753462329.30872
    }
  ]
};

const response = {
  session_id: "4428f877-23c9-463f-94ff-862c71edf1a6",
  messages: [
    {
      content: {
        parts: [
          {
            function_call: {
              id: "adk-0a23109d-6a50-4a18-89ee-8566d364c725",
              args: { agent_name: "strategy_planner_agent" },
              name: "transfer_to_agent"
            }
          }
        ],
        role: "model"
      },
      usage_metadata: {
        candidates_token_count: 13,
        candidates_tokens_details: [{ modality: "TEXT", token_count: 13 }],
        prompt_token_count: 1099,
        prompt_tokens_details: [{ modality: "TEXT", token_count: 1099 }],
        thoughts_token_count: 418,
        total_token_count: 1530,
        traffic_type: "ON_DEMAND"
      },
      invocation_id: "e-61b3e00f-d40c-4ac0-840f-e6e459c29ab8",
      author: "root_agent",
      actions: { state_delta: {}, artifact_delta: {}, requested_auth_configs: {} },
      long_running_tool_ids: [],
      id: "6f552952-03f3-4a2d-9570-082c1ac48fc3",
      timestamp: 1753458353.907328
    },
    {
      content: {
        parts: [
          {
            function_response: {
              id: "adk-0a23109d-6a50-4a18-89ee-8566d364c725",
              name: "transfer_to_agent",
              response: { result: null }
            }
          }
        ],
        role: "user"
      },
      invocation_id: "e-61b3e00f-d40c-4ac0-840f-e6e459c29ab8",
      author: "root_agent",
      actions: {
        state_delta: {},
        artifact_delta: {},
        transfer_to_agent: "strategy_planner_agent",
        requested_auth_configs: {}
      },
      id: "ed1092e4-fb66-4377-a06e-efccd60645bf",
      timestamp: 1753458357.873937
    },
    {
      content: {
        parts: [
          {
            text: 'Z세대를 타겟으로 하는 SNS 마케팅 전략을 수립해 드리겠습니다. Z세대는 디지털 네이티브 세대로, 진정성, 재미, 참여를 중요하게 생각하며 짧은 형식의 비디오 콘텐츠에 익숙합니다.\n\n---\n\n### **Z세대 타겟 SNS 마케팅 전략**\n\n**1. 비즈니스 목표 및 현황 분석**\n*   **가정된 목표:** Z세대 사이에서 브랜드 인지도 및 참여도 증대, 웹사이트 트래픽 및 전환율 향상.\n*   **현황:** (현재 SNS 채널 운영 여부, 기존 성과, 경쟁사 분석 등 구체적인 정보가 있다면 더욱 맞춤형 전략 수립 가능)\n\n**2. 타겟 오디언스 및 시장 환경 분석**\n*   **타겟 오디언스 (Z세대):**\n    *   **특징:** 짧은 집중 시간, 시각적 콘텐츠 선호, 진정성 중시, 사회적 이슈에 민감, 참여형 콘텐츠 선호, 트렌드에 민감.\n    *   **주요 SNS 플랫폼:** TikTok, Instagram (Reels, Stories), YouTube (Shorts).\n*   **시장 환경:** 경쟁 심화, 인플루언서 마케팅의 중요성 증대, 숏폼 콘텐츠의 강세.\n\n**3. SMART 목표 설정**\n*   **구체적 (Specific):** TikTok 및 Instagram 채널에서 Z세대 팔로워 및 참여율 증대, SNS를 통한 웹사이트 유입 및 전환율 향상.\n*   **측정 가능 (Measurable):**\n    *   향후 6개월 내 TikTok 및 Instagram 팔로워 각각 30% 증가.\n    *   평균 게시물 참여율 (좋아요, 댓글, 공유, 저장) 5% 달성.\n    *   SNS를 통한 웹사이트 유입률 15% 증대.\n    *   SNS 유입 고객의 전환율 3% 달성.\n*   **달성 가능 (Achievable):** 현실적인 목표 설정 (현재 데이터 기반).\n*   **관련성 (Relevant):** 브랜드 성장 및 Z세대 시장 점유율 확대에 기여.\n*   **기한 (Time-bound):** 6개월 이내.\n\n**4. 캠페인 전략 및 채널 선정**\n\n*   **주요 채널:** TikTok, Instagram, YouTube (Shorts)\n*   **콘텐츠 전략 (AIDA 프레임워크 적용):**\n    *   **주의 (Attention):**\n        *   **숏폼 비디오:** TikTok, Instagram Reels, YouTube Shorts를 활용한 트렌디하고 바이럴 가능한 챌린지, 유머, 튜토리얼, 제품 언박싱 등.\n        *   **훅(Hook) 강조:** 영상 초반 3초 내 시선을 사로잡는 강력한 메시지 또는 비주얼.\n        *   **UGC (User-Generated Content) 유도:** 사용자가 직접 참여하고 공유할 수 있는 챌린지 또는 콘테스트 기획.\n    *   **관심 (Interest):**\n        *   **진정성 있는 스토리텔링:** 브랜드의 비하인드 스토리, 가치, 제작 과정 등을 솔직하고 투명하게 공유.\n        *   **인플루언서 협업:** Z세대에게 영향력 있는 마이크로/나노 인플루언서와 협업하여 자연스러운 제품/서비스 노출.\n        *   **교육 및 정보성 콘텐츠:** Z세대의 관심사를 반영한 유용하고 흥미로운 정보 제공 (예: 뷰티 팁, 패션 스타일링, 친환경 정보 등).\n    *   **욕구 (Desire):**\n        *   **제품/서비스의 가치 시각화:** 실제 사용 모습, 비포/애프터, 문제 해결 능력 등을 매력적인 비주얼로 보여주기.\n        *   **사회적 가치 강조:** 브랜드가 추구하는 사회적 책임, 지속 가능성 등 Z세대가 공감할 수 있는 가치 전달.\n        *   **독점 콘텐츠/혜택:** 팔로워를 위한 특별 할인, 한정판 제품, 이벤트 등.\n    *   **행동 (Action):**\n        *   **명확한 CTA (Call-to-Action):** "프로필 링크 클릭", "지금 구매하기", "챌린지 참여하기", "친구 태그하기" 등 구체적인 행동 유도.\n        *   **라이브 커머스/Q&A:** 실시간 소통을 통해 구매 전환 유도 및 궁금증 해소.\n        *   **콘테스트 및 경품 이벤트:** 참여를 통해 제품/서비스 경험 기회 제공.\n\n*   **핵심 전술:**\n    *   **인플루언서 마케팅:** Z세대 친화적인 인플루언서와의 장기적인 파트너십 구축.\n    *   **커뮤니티 빌딩:** 댓글 소통, DM 응대, 팬덤 형성, 전용 해시태그 활성화.\n    *   **트렌드 반영:** 최신 밈, 사운드, 챌린지 등을 빠르게 파악하고 브랜드에 맞게 재해석하여 콘텐츠 제작.\n    *   **인터랙티브 콘텐츠:** 설문, 퀴즈, Q&A 스티커 등을 활용하여 사용자 참여 유도.\n\n**5. 예산 계획 및 리소스 할당**\n*   **채널별 예산 배분:** TikTok (광고, 인플루언서), Instagram (광고, 인플루언서), YouTube (광고, 콘텐츠 제작) 등 Z세대 도달 및 참여율을 고려하여 비중 설정.\n*   **콘텐츠 제작 비용:** 숏폼 비디오 편집 툴, 그래픽 디자인, 필요시 전문 촬영 장비 및 인력.\n*   **광고 집행 비용:** 각 플랫폼의 유료 광고 (인피드 광고, 챌린지 광고 등).\n*   **인플루언서 마케팅 비용:** 인플루언서 섭외 및 계약 비용, 제품 협찬 비용.\n*   **분석 및 측정 도구 비용:** SNS 분석 툴 구독료.\n*   **예비 비용:** 총 예산의 10-15% (예상치 못한 상황 대비).\n\n**6. 일정 및 마일스톤 설정 (예시: 6개월 계획)**\n*   **1개월차:**\n    *   Z세대 페르소나 심화 분석 및 콘텐츠 아이디어 브레인스토밍.\n    *   SNS 채널 최적화 (프로필, 하이라이트 등).\n    *   초기 콘텐츠 제작 및 업로드 시작 (주 3회 이상).\n    *   인플루언서 리서치 및 컨택.\n*   **2-3개월차:**\n    *   정기적인 콘텐츠 업로드 및 트렌드 반영 콘텐츠 강화.\n    *   인플루언서 협업 캠페인 시작.\n    *   UGC 유도 챌린지 또는 이벤트 진행.\n    *   초기 성과 분석 및 콘텐츠 전략 조정.\n*   **4-6개월차:**\n    *   성과가 좋은 콘텐츠 유형 확대 및 유료 광고 집행 최적화.\n    *   라이브 스트리밍, Q&A 등 실시간 소통 강화.\n    *   Z세대 커뮤니티 활성화 및 팬덤 관리.\n    *   종합 성과 분석 및 다음 마케팅 전략 수립.\n\n**7. 성과 측정 지표 정의**\n*   **인지도:** 팔로워 수 증가율, 도달률 (Reach), 노출 수 (Impressions), 브랜드 언급량.\n*   **참여도:** 좋아요, 댓글, 공유, 저장 수, 평균 참여율, DM 문의 수, 스토리 조회율.\n*   **트래픽:** SNS를 통한 웹사이트 유입 수, 프로필 링크 클릭률 (CTR).\n*   **전환:** SNS 유입 고객의 구매/가입 수, 전환율.\n*   **브랜드 정서:** 댓글 및 언급의 긍정/부정 비율, 브랜드 이미지 설문조사.\n\n---\n\n이 전략은 일반적인 Z세대 SNS 마케팅 가이드라인이며, 특정 제품/서비스의 특성과 예산에 따라 세부 내용은 조정될 수 있습니다.'
          }
        ],
        role: "model"
      },
      usage_metadata: {
        candidates_token_count: 2100,
        candidates_tokens_details: [{ modality: "TEXT", token_count: 2100 }],
        prompt_token_count: 1127,
        prompt_tokens_details: [{ modality: "TEXT", token_count: 1127 }],
        thoughts_token_count: 1758,
        total_token_count: 4985,
        traffic_type: "ON_DEMAND"
      },
      invocation_id: "e-61b3e00f-d40c-4ac0-840f-e6e459c29ab8",
      author: "strategy_planner_agent",
      actions: { state_delta: {}, artifact_delta: {}, requested_auth_configs: {} },
      id: "061f8b84-27ff-4be3-bedf-60c3d5274bf6",
      timestamp: 1753458357.874472
    }
  ]
};
