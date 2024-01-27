import styles from "./PopoverMenu.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { MatIcon } from "../icons/MatIcon";

const PopoverMenu = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<any>();

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        aria-label="More actions"
        className="border bg-gray-100 hover:bg-gray-200 hover:border-gray-300 rounded-2xl px-2 py-1"
      >
        <MatIcon className="w-5 h-5" icon="more-vert" />
      </button>
      {isVisible && (
        <div ref={menuRef} className={styles.popoverMenu}>
          {children}
        </div>
      )}
    </div>
  );
};

export default PopoverMenu;
