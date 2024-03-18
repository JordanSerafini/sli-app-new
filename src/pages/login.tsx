import { useState } from "react";

import ButtonFull from "../component/button/buttonFull";
import sliLogo from "../assets/SLIlogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const data = {
      email,
      password,
    };
    console.log(data);
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

export default Login;
