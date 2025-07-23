"use client";

import Header from "@/components/Header";
import IdeaLab from "@/components/IdeaLab/IdeaLab";
import KnowledgeHub from "@/components/KnowledgeHub";
import TabButtons from "@/components/TabButton";
import WritingStudio from "@/components/WritingStudio";
import { ActionType } from "@/types/actionType";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActionType>("knowledge");

  return (
    <main className="h-screen p-4 flex flex-col gap-4">
      <Header />

      {/* 탭 버튼들 - 1024px 이하에서만 표시 */}
      <div className="lg:hidden">
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* 데스크톱: 모든 컴포넌트 표시, 모바일: activeTab에 따라 표시 */}
        <div className={`${activeTab === "knowledge" ? "block" : "hidden"} lg:block lg:w-1/4`}>
          <KnowledgeHub />
        </div>
        <div className={`${activeTab === "writing" ? "block" : "hidden"} lg:block lg:w-2/4`}>
          <WritingStudio />
        </div>
        <div className={`${activeTab === "ideation" ? "block" : "hidden"} lg:block lg:w-1/4`}>
          <IdeaLab />
        </div>
      </div>
    </main>
  );
}
