import { useEffect, useRef } from 'react';
import gsap from "gsap";

interface ToastProps {
  message: string;
  onClose: () => void;
  position?: string;
  css?: string;
}

const Toast = ({ message, onClose, position = "bottom", css = "" }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (toastRef.current) {
      gsap.fromTo(toastRef.current, {
        x: 0, opacity: 0, scale: 0.3
      }, {
        x: 0, opacity: 1, duration: 1, scale:1,  ease: "power3.out"
      });
    }
  }, [message]); 

  // Classes de positionnement basées sur la prop 'position'
  let positionClasses = "bottom-0 left-1/2 transform -translate-x-1/2";
  switch (position) {
    case "top": positionClasses = "top-1/3 left-1/2 transform -translate-x-1/2"; break;
    case "top-left": positionClasses = "top-0 left-0"; break;
    case "top-right": positionClasses = "top-0 right-0"; break;
    case "bottom": positionClasses = "mb-16 bottom-0 left-1/2 transform -translate-x-1/2"; break;
    case "bottom-left": positionClasses = "bottom-0 left-0"; break;
    case "bottom-right": positionClasses = "bottom-0 right-0"; break;
    case "left": positionClasses = "top-1/2 left-0 transform -translate-y-1/2"; break;
    case "right": positionClasses = "top-1/2 right-0 transform -translate-y-1/2"; break;
    case "center": positionClasses = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"; break;
    default: "center"; break;
  }

  return (
    <div
      ref={toastRef} 
      className={`${css} text-center fixed bg-gray-800 text-white p-4 rounded-lg z-50 cursor-pointer ${positionClasses}`}
      onClick={onClose}
    >
      {message}
    </div>
  );
};

export default Toast;
