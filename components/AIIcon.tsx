
import React, { useState, useEffect, useCallback } from 'react';
import generateSvg from "@/public/generate.svg"


interface AIIconProps {
  onClick: () => void;
}

const AIIcon: React.FC<AIIconProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ bottom: 0, right: 0 });

  const handleIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  }, [onClick]);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('msg-form__contenteditable')) {
        setIsVisible(true);
        updatePosition(target);
      }
    };

    const handleBlur = (e: FocusEvent) => {
      if ((e.target as HTMLElement).classList.contains('msg-form__contenteditable')) {
        setTimeout(() => setIsVisible(false), 200);
      }
    };

    const updatePosition = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      setPosition({
        bottom: window.innerHeight - rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right + 10,
      });
    };

    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);

    return () => {
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      onClick={handleIconClick}
      style={{
        position: 'fixed',
        bottom: `${position.bottom}px`,
        right: `${position.right}px`,
        zIndex: 9999,
      }}
      className="cursor-pointer rounded-full w-12 h-12 flex items-center justify-center"
    >
         <img src={generateSvg} alt="icon" />
    </div>
  );
};

export default AIIcon;