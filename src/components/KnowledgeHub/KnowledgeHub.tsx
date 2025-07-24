import { VectorCollection } from "@/types/vectorCollection";
import { uploadVectorStoreFile } from "@/utils/vectorStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVectorCollections } from "@/api/vector";

const KnowledgeHub = () => {
  // useQuery 사용
  const {
    data: vectorCollections = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["vectorCollections"],
    queryFn: fetchVectorCollections
  });

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
      <div className="content-container-header">
        <h1>Knowledge Hub</h1>
      </div>
      <div className="p-4">
        <div className="my-4 space-y-2">
          {vectorCollections.map((collection: VectorCollection) => (
            <div key={collection.name} className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-[var(--black)]">{collection.name}</h3>
            </div>
          ))}
        </div>
        <AddSourceButton refetch={refetch} />
      </div>
    </div>
  );
};

const AddSourceButton = ({ refetch }: { refetch: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const fileUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        const response = await uploadVectorStoreFile({ name: fileName, file: selectedFile });
        setFileName("");
        setSelectedFile(null);
        console.log(response);
        const { name, count } = response;
        refetch();
      } catch (error) {
        console.error("Failed to upload vector collection:", error);
      } finally {
        setIsUploading(false);
        setFileName("");
      }
    }
  };
  const onClickButton = () => {
    const input = document.getElementById("file-input") as HTMLInputElement;
    input?.click();
  };

  useEffect(() => {
    if (selectedFile) {
      fileUpload();
    }
  }, [selectedFile]);

  return (
    <>
      <div onClick={onClickButton} className="p-3 bg-blue-100 rounded-lg text-center cursor-pointer">
        <h3 className="font-bold text-[var(--black)] text-2xl">+</h3>
        {fileName && <p className="text-sm text-black mt-1">{fileName}</p>}
      </div>
      <input id="file-input" type="file" accept=".md" onChange={handleFileChange} readOnly className="hidden" />
    </>
  );
};

export default KnowledgeHub;
