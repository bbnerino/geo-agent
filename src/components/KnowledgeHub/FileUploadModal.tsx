import { useFileStore } from "@/store/useFileStore";
import Modal from "../common/Modal";
import { uploadFile } from "@/api/files/upload";
import { uploadVectorStoreFile } from "@/utils/vectorStore";
import { useEffect, useState } from "react";
import { getFileDescription } from "@/api/files/getDescription";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

export default function FileUploadModal({ open, onClose, refetch }: Props) {
  const { name, fileAlias, fileDesc, setDescription, file, clearFile } = useFileStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    uploadVectorStoreFile({ name, file }).then(async (response) => {
      console.log(response);
      handleSaveFile();
    });
  };

  const handleSaveFile = async () => {
    uploadFile({
      userId: 1,
      name,
      fileAlias,
      fileDesc
    })
      .then(() => {
        handleClose();
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getFileDesc = async () => {
    setIsLoading(true);
    const response = await getFileDescription(file).finally(() => {
      setIsLoading(false);
    });
    console.log("🟠", response);
    setDescription(response || "-");
  };

  useEffect(() => {
    if (file) getFileDesc();
  }, [file]);

  const handleClose = () => {
    onClose();
    clearFile();
  };

  return (
    <Modal size="large" open={open} onClose={handleClose}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-gray-300">{name}</p>

          <div>
            <span className="">파일 이름</span>
            <span className="ml-2 text-blue-500">{fileAlias || "-"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex justify-center h-60 w-full">
              <div className="mt-5 w-full">
                <p className="text-purple-500 text-lg font-semibold mb-2 ">AI 요약 중...</p>
                <ul className="space-y-3">
                  <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                  <li className="w-[100%] h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                  <li className="w-[80%] h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                  <li className="w-[80%] h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <p className="text-purple-500 text-lg font-semibold mb-2 ">AI 요약</p>
              <textarea
                className="border border-gray-300 rounded-md p-2 resize-none h-60 w-full"
                value={fileDesc}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleUpload}>
        UPLOAD
      </button>
    </Modal>
  );
}
