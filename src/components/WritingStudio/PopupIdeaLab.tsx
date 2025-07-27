import React from "react";
import Modal from "../common/Modal";
import { useWritingStudioStore } from "@/store/writingStudio";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PopupIdeaLab = ({ open, onClose }: Props) => {
  const { selectedSentence } = useWritingStudioStore();

  return (
    <Modal size="small" open={open} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-gray-300">{selectedSentence}</p>
        </div>

        <div>
          <span className="">파일 이름</span>
          <span className="ml-2 text-blue-500">{selectedSentence || "-"}</span>
        </div>
      </div>
    </Modal>
  );
};

export default PopupIdeaLab;
