import { useNavigate } from 'react-router-dom';

import backarrowLogo from '../../assets/backarrowLogo.png';

function BackButton({css=""}: {css?: string}) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={`${css}`}>
        <img src={backarrowLogo} alt="" className='h-6 border-1 border-blue-400 rounded-2xl ' />
    </button>
  );
}

export default BackButton;
