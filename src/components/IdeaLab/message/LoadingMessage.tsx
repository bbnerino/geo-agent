export default function LoadingMessage() {
  return (
    <div
      className="w-full h-10 rounded-md bg-gray-100 relative overflow-hidden"
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,200,200,0.2), transparent)",
          animation: "shimmer 1.5s infinite",
          transform: "translateX(-100%)"
        }}
      />
      <style>
        {`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}
      </style>
    </div>
  );
}
