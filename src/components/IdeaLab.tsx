export default function IdeaLab() {
  return (
    <div className="content-container content-container-right lg:flex-1">
      <div className="content-container-header">
        <h1>스튜디오</h1>
      </div>
      <div className="p-4">
        <p className="text-[var(--black)]">스튜디오 관련 내용이 여기에 표시됩니다.</p>
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-[var(--gray-50)] rounded-lg">
            <h3 className="font-medium text-[var(--black)]">프로젝트 1</h3>
            <p className="text-sm text-[var(--gray-100)] mt-1">프로젝트 설명</p>
          </div>
          <div className="p-3 bg-[var(--gray-50)] rounded-lg">
            <h3 className="font-medium text-[var(--black)]">프로젝트 2</h3>
            <p className="text-sm text-[var(--gray-100)] mt-1">프로젝트 설명</p>
          </div>
        </div>
      </div>
    </div>
  );
}
