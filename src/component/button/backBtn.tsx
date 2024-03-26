import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import backarrowLogo from '../../assets/backarrowLogo.png';
import HomeBtn from '../../assets/homeBtn.png';

interface BackButtonProps {
  css?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ css = "" }) => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState<string>(backarrowLogo);

  let touchStartY: number = 0;

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touchEndY = e.changedTouches[0].clientY;
    const distanceMoved = touchStartY - touchEndY;

    // Si l'utilisateur glisse vers le haut, basculer vers HomeBtn, sinon vers backarrowLogo
    if (distanceMoved > 30) { // Glissé vers le haut
      setIcon(HomeBtn);
    } else if (distanceMoved < -30) { // Glissé vers le bas
      setIcon(backarrowLogo);
    }
  };

  const handleClick = () => {
    if (icon === HomeBtn) {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className={css}
    >
      <img src={icon} alt="" className='h-6 border-1 border-blue-400 rounded-2xl' />
    </button>
  );
};

export default BackButton;
