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

      {/* 데스크톱 레이아웃 - 1024px 이상에서만 표시 */}
      <div className="hidden lg:flex flex-col lg:flex-row gap-4 h-full">
        <KnowledgeHub />
        <WritingStudio />
        <IdeaLab />
      </div>

      {/* 모바일/태블릿 레이아웃 - 1024px 이하에서만 표시 */}
      <div className="lg:hidden h-full">
        {activeTab === "knowledge" && <KnowledgeHub />}
        {activeTab === "writing" && <WritingStudio />}
        {activeTab === "ideation" && <IdeaLab />}
      </div>
    </main>
  );
}
