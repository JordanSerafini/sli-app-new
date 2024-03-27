import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../function/function";
import dataContext from "../context/context/dataContext";

import ButtonFull from "../component/button/buttonFull";
import sliLogo from "../assets/SLIlogo.png";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useContext(dataContext);

  const handleSubmit = async () => {
    try {
      const data = {
        email,
        password,
      };

      const { logged } = await login(data.email, data.password);

      if (logged === true) {
        navigate("/");
      } else {
        showToast("Email ou mot de passe incorrect.", 3000, "bottom", "bg-red-700 w-full");
      }

        
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        showToast(error.message, 5000, "center", "bg-red-500 w-full");
      } else {
        console.error("Une erreur inattendue s'est produite.");
        showToast(
          "Une erreur inattendue s'est produite.",
          3000,
          "bottom",
          "bg-orange-500 w-full"
        );
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-16">
      <img src={sliLogo} alt="SLI Logo" className="rounded-full" />
      <div className="flex flex-col w-10/10 gap-4">
        {/*----------------------------------------------------------------------------------------------------*/}
        <div className="flex flex-col w-10/10 items-center gap-2">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border-2 w-9/10 border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg hover:scale-105 transform hover:transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border-2 w-9/10 border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg hover:scale-105 transform hover:transition"
          />
        </div>
        {/*----------------------------------------------------------------------------------------------------*/}
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <ButtonFull
            title="Connexion"
            onClick={handleSubmit}
            css="w-9/10 rounded-2xl tracking-wider"
          />
          <p className="text-primary tracking-widest">Mot de passe oublié ?</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
