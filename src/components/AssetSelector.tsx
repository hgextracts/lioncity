interface AssetSelectorProps {
  text?: string;
  onClick: () => void;
  disabled?: boolean; // New prop to indicate if the selector should be disabled
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`asset-selector w-[200px] bg-accent p-4 rounded-md ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default AssetSelector;
