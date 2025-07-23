export default function IdeaLab() {
  return (
    <div className="content-container content-container-right lg:flex-1">
      <div className="content-container-header">
        <h1>Idea Lab</h1>
      </div>
      <div className="p-4">
        <p className="text-[var(--black)]">채팅 관련 내용이 여기에 표시됩니다.</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[var(--gray-50)] rounded-full flex items-center justify-center">
              <span className="text-xs text-[var(--black)]">U</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--black)]">사용자 메시지입니다.</p>
              <p className="text-xs text-[var(--gray-100)] mt-1">오후 2:30</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[var(--gray-50)] rounded-full flex items-center justify-center">
              <span className="text-xs text-[var(--black)]">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--black)]">AI 응답입니다.</p>
              <p className="text-xs text-[var(--gray-100)] mt-1">오후 2:31</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
