import { useEffect, useRef } from "react";
import { MatIcon } from "../icons/MatIcon";
import styles from "./HelpText.module.css";

export function HelpText({ children, size }: any) {
  const tooltip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tooltipElement = tooltip.current;

    if (tooltipElement) {
      if (tooltipElement.clientWidth < 178) {
        tooltipElement.classList.add("w-44");
        tooltipElement.classList.remove("w-fit");
      } else {
        tooltipElement.classList.add("w-fit");
        tooltipElement.classList.remove("w-44");
      }
    }
  }, [tooltip]);

  return (
    <div className={`relative group ${styles.tooltip}`}>
      <MatIcon width={size} height={size} icon="help-outline" />
      <div
        ref={tooltip}
        className="absolute text-sm text-center font-normal group-hover:opacity-100 group-hover:visible opacity-0 invisible bg-gray-800 text-white rounded-lg p-2 left-2 -translate-x-1/2 transition-opacity duration-300 ease-out shadow"
      >
        {children}
      </div>
    </div>
  );
}
