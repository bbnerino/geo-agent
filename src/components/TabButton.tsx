import { ActionType } from "@/types/actionType";

const TabButtons = ({
  activeTab,
  setActiveTab
}: {
  activeTab: ActionType;
  setActiveTab: (tab: ActionType) => void;
}) => {
  const tabs = ["knowledge", "writing", "ideation"] as const;

  return (
    <div className="flex bg-[var(--white)] rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab
              ? "bg-[var(--gray-50)] text-[var(--black)]"
              : "text-[var(--gray-100)] hover:text-[var(--black)]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
