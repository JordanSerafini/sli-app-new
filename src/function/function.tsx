import axios from "axios";
import url from "../utils/axios";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../types/item";
import { Customer } from "../types/customer";

export type FetchDataContextParams = {
  setItemList?: Dispatch<SetStateAction<Item[]>>;
  setCustomerList?: Dispatch<SetStateAction<Customer[]>>;
};

export async function fetchItems(
  setItemList: Dispatch<SetStateAction<Item[]>>
) {
  try {
    const response = await axios.get(`${url.main}/getAllitem`);
    setItemList(response.data.rows);
  } catch (error) {
    console.error("Error fetching items: ", error);
  }
}

export async function fetchCustomer(
  setCustomerList: Dispatch<SetStateAction<Customer[]>>
) {
  try {
    const response = await axios.get(`${url.main}/getAllCustomer`);
    setCustomerList(response.data.rows);
  } catch (error) {
    console.error("Error fetching clients: ", error);
  }
}



import dataContext from "../context/context/dataContext";
import { useContext } from "react";

export async function Login(email: string, password: string) {
  const { setIsLoggedIn } = useContext(dataContext);

  try {
    const response = await axios.post(`${url.local}/login`, {
      email,
      password,
    });
    const { token } = response.data;

    // Stocker le token dans le LocalStorage
    localStorage.setItem("token", token);

    {setIsLoggedIn && setIsLoggedIn(true);}
    return { token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new Error("Adresse e-mail ou mot de passe incorrect.");
      } else {
        console.error("Erreur lors de la connexion : ", error);
        throw new Error("Une erreur est survenue lors de la connexion.");
      }
    }
    throw error;
  }
}

