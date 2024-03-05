import { useEffect, useRef } from 'react';

import gsap from "gsap";

interface ToastProps {
  message: string;
  onClose: () => void;
  position?: string;
  css?: string;
}

const Toast = ({ message, onClose, position, css }: ToastProps) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      gsap.from(toastRef.current, {
        x: 100, // Commence 100 pixels plus à droite de sa position finale
        autoAlpha: 0, // Commence invisible (autoAlpha gère à la fois l'opacité et la visibilité)
        duration: 0.5, // Durée de l'animation en secondes
      });
    }
  }, [message]);

    let positionClasses;
    switch (position) {
      case "top":
        positionClasses = "top-1/3 left-1/2 transform -translate-x-1/2";
        break;
      case "top-left":
        positionClasses = "top-0 left-0";
        break;
      case "top-right":
        positionClasses = "top-0 right-0";
        break;
      case "bottom":
        positionClasses = "bottom-0 left-1/2 transform -translate-x-1/2";
        break;
      case "bottom-left":
        positionClasses = "bottom-0 left-0";
        break;
      case "bottom-right":
        positionClasses = "bottom-0 right-0";
        break;
      case "left":
        positionClasses = "top-1/2 left-0 transform -translate-y-1/2";
        break;
      case "right":
        positionClasses = "top-1/2 right-0 transform -translate-y-1/2";
        break;
      case "center":
        positionClasses = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
        break;
      default:
        positionClasses = "bottom-0 left-1/2 transform -translate-x-1/2";
        break;
    }
  

  return (
    <div
    ref={toastRef}
    className={`${css} fixed bg-gray-800 text-white p-4 rounded-lg z-50 cursor-pointer ${positionClasses}`}
    onClick={onClose}
    >
      {message}
    </div>
  );
};

export default Toast;
