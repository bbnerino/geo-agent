import { useFileStore } from "@/store/useFileStore";
import Modal from "../common/Modal";
import { useEffect } from "react";
import { createFile } from "@/api/files";
import { uploadVectorStoreFile } from "@/utils/vectorStore";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

export default function FileUploadModal({ open, onClose, refetch }: Props) {
  const { name, fileAlias, fileDesc, setDescription, selectedFile } = useFileStore();

  const handleUpload = async () => {
    if (!selectedFile) return;
    uploadVectorStoreFile({ name, file: selectedFile }).then(async (response) => {
      console.log(response);
      if (response.status === 200) {
        handleSaveFile();
      }
    });
  };

  const handleSaveFile = async () => {
    createFile({
      userId: 1,
      name,
      fileAlias,
      fileDesc
    })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          refetch();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal width={600} open={open} onClose={onClose}>
      <div className="flex">
        <div className="flex flex-col gap-2">
          <p className="text-gray-300">{name}</p>

          <div>
            <span className="">파일 이름</span>
            <span className="ml-2 text-blue-500">{fileAlias || "-"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">설명</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 resize-none h-50"
            value={fileDesc}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleUpload}>
        UPLOAD
      </button>
    </Modal>
  );
}
