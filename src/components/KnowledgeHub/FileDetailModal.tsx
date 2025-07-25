import React from "react";
import Modal from "../common/Modal";
import { VectorCollection } from "@/types/vectorCollection";

interface Props {
  open: boolean;
  onClose: () => void;
  file: VectorCollection | null;
}

const FileDetailModal = ({ open, onClose, file }: Props) => {
  return (
    <Modal size="large" open={open} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-gray-300">{file?.name}</p>
        </div>

        <div>
          <span className="">파일 이름</span>
          <span className="ml-2 text-blue-500">{file?.fileAlias || "-"}</span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">AI 요약</label>
          <div className="border border-gray-300 rounded-md p-2 resize-none h-50">
            <p className="text-gray-500">{file?.fileDesc || "-"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FileDetailModal;
