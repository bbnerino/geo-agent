import { VectorCollection } from "@/types/vectorCollection";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVectorCollections } from "@/api/vector";
import FileUploadModal from "./FileUploadModal";
import { useFileStore } from "@/store/useFileStore";
import FileDetailModal from "./FileDetailModal";

const KnowledgeHub = () => {
  // 🟢 제거
  const [isShow, setIsShow] = useState(false);

  const {
    data: vectorCollections = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["vectorCollections"],
    queryFn: fetchVectorCollections,
    enabled: isShow
  });

  const [isFileDetailModalOpen, setIsFileDetailModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<VectorCollection | null>(null);

  if (isLoading) {
    return (
      <div className="content-container content-container-left h-full">
        <div className="content-container-header">
          <h1>Knowledge Hub</h1>
        </div>
        <div className="p-4">
          <p className="text-[var(--black)]">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container content-container-left h-full">
        <div className="content-container-header">
          <h1>Knowledge Hub</h1>
        </div>
        <div className="p-4">
          <p className="text-red-500">에러가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container content-container-left h-full">
      <div className="content-container-header flex">
        <h1>Knowledge Hub</h1>
        {/* 🟢 제거 */}
        <input className="ml-4" type="checkbox" checked={isShow} onChange={() => setIsShow(!isShow)} />
      </div>
      <div className="p-4">
        <div className="my-4 space-y-2">
          {vectorCollections.map((collection: VectorCollection) => (
            <div
              onClick={() => {
                setSelectedFile(collection);
                setIsFileDetailModalOpen(true);
              }}
              key={collection.name}
              className="p-3 bg-blue-50 rounded-lg"
            >
              <h3 className="font-medium text-[var(--black)]">{collection.fileAlias || collection.name}</h3>
            </div>
          ))}
        </div>
        <AddSourceButton refetch={refetch} />
      </div>
      <FileDetailModal open={isFileDetailModalOpen} onClose={() => setIsFileDetailModalOpen(false)} file={selectedFile} />
    </div>
  );
};

const AddSourceButton = ({ refetch }: { refetch: () => void }) => {
  const { file, setFile, createFile } = useFileStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      createFile(e.target.files[0].name);
      console.log(e.target.files[0]);
    }
  };

  const onClickButton = () => {
    const input = document.getElementById("file-input") as HTMLInputElement;
    input?.click();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (file) setIsModalOpen(true);
  }, [file]);

  return (
    <>
      <div onClick={onClickButton} className="p-3 bg-purple-300 rounded-lg text-center cursor-pointer">
        <h3 className="font-bold text-white text-2xl">+</h3>
      </div>
      {file && <p>{file.name}</p>}
      <input id="file-input" type="file" accept=".md" onChange={handleFileChange} readOnly className="hidden" />

      <FileUploadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} refetch={refetch} />
    </>
  );
};

export default KnowledgeHub;
