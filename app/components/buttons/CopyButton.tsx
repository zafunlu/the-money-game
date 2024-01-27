import { Dispatch, useState } from "react";

type CopyButtonProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
  onCopied?: Dispatch<boolean>;
};

export function CopyButton({ children, className, value, onCopied }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      if (onCopied) {
        onCopied(true);
      }

      setTimeout(() => {
        setIsCopied(false);

        if (onCopied) {
          onCopied(false);
        }
      }, 4_000);
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }
  }

  const copiedElement = (
    <div className="cursor-default absolute ml-2 left-full z-10 rounded-[20px] bg-tonal px-2 py-1 text-xs">
      Copied!
    </div>
  );

  return (
    <button className={`relative ${className}`} onClick={copyToClipboard}>
      {children}
      {isCopied && copiedElement}
    </button>
  );
}
