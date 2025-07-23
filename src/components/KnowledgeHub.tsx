const KnowledgeHub = () => {
  return (
    <div className="content-container content-container-left h-full">
      <div className="content-container-header">
        <h1>Knowledge Hub</h1>
      </div>
      <div className="p-4">
        <p className="text-[var(--black)]">출처 관련 내용이 여기에 표시됩니다.</p>
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-[var(--gray-50)] rounded-lg">
            <h3 className="font-medium text-[var(--black)]">출처 항목 1</h3>
            <p className="text-sm text-[var(--gray-100)] mt-1">출처 설명</p>
          </div>
          <div className="p-3 bg-[var(--gray-50)] rounded-lg">
            <h3 className="font-medium text-[var(--black)]">출처 항목 2</h3>
            <p className="text-sm text-[var(--gray-100)] mt-1">출처 설명</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KnowledgeHub;
