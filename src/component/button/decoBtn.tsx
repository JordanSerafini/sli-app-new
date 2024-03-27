import { useNavigate } from "react-router-dom";
import decoLogo from "../../assets/decoLogo.png";

function DecoBtn({ css }: { css?: string }) {
  const navigate = useNavigate();

  const goToHome = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={css}>
      <button onClick={goToHome}>
        <img src={decoLogo} alt="Déconnexion" className="h-8" />
      </button>
    </div>
  );
}

export default DecoBtn;
