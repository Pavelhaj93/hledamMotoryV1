import { useState, useRef, useEffect } from "react";

interface UseClickOutsideOptions {
  initialIsOpen?: boolean;
}

const useClickOutside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return {
    isOpen,
    toggleOpen,
    close,
    ref,
  };
};

export default useClickOutside;
