import React from "react";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  position?: { x: number; y: number };
}

const Modal2 = ({ open, onClose, onConfirm, children, size = "medium", position }: ModalProps) => {
  const width = {
    small: "300px",
    medium: "400px",
    large: "700px"
  }[size];
  if (!open) return null;
  return (
    <div
      style={{ position: "fixed", width: width, top: position?.y, left: position?.x }}
      className={`bg-white rounded-lg shadow-lg flex flex-col p-6 relative shadow-lg z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute top-2 right-2 cursor-pointer text-gray-500 font-bold text-lg" onClick={onClose}>
        X
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
      <div className="absolute bottom-4 right-6 flex gap-2">
        {onConfirm && (
          <Button variant="secondary" onClick={onConfirm}>
            확인
          </Button>
        )}
      </div>
    </div>
    // </div>
  );
};

export default Modal2;
