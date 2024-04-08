import { useState, useEffect, useContext } from "react";
import axios from "axios";
import url from "../utils/axios";
import dataContext from "../context/context/dataContext";

const useLogin = () => {
  const dataContextValue = useContext(dataContext);
  const { setIsLoggedIn } = dataContextValue ?? {}; 
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async (email: string, password: string) => {
      try {
        const response = await axios.post(`${url.local}/login`, {
          email,
          password,
        });
        const { token } = response.data;

        localStorage.setItem("token", token);
        setIsLoggedIn && setIsLoggedIn(true);
        setToken(token);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          setError("Adresse e-mail ou mot de passe incorrect.");
        } else {
          console.error("Erreur lors de la connexion : ", error);
          setError("Une erreur est survenue lors de la connexion.");
        }
      }
    };

    handleLogin("email", "password");

  }, [setIsLoggedIn]);

  return { token, error };
};

export default useLogin;
