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

export async function fetchStockDoc() {
  try {
    const response = await axios.get(`${url.main}/getAllStockDocs`);
    return response.data.rows;
  } catch (error) {
    console.error("Error fetching stock documents: ", error);
  }
}

export async function fetchStockDocDetails(id: string) {
  try {
    const response = await axios.get(`${url.main}/getStockDocDetails/${id}`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock documents details: ", error);
    return null; 
  }
}

export async function fetchDepot() {
  try {
    const response = await axios.get(`${url.main}/getAllDepot`);
    return response.data;
  } catch (error) {
    console.error("Error fetching depot: ", error);
    return null;
  }
}

export async function login(email: string, password: string) {

  try {
    const response = await axios.post(`${url.main}/login`, {
      email,
      password,
    });
    const { token, userData } = response.data;

    const userDataSort = {
      id: userData.id,
      email: userData.email,
      prenom: userData.prenom,
      nom: userData.nom,
      role: userData.role,
  };
    // Stocker le token dans le LocalStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userDataSort));
    return { token, logged: true};
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

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
}

export async function fetchStockDocLinesWithPrice() {
  try {
    const response = await axios.get(`${url.main}/getDocLineWithPrice`);
    return response;
  } catch (error) {
    console.error("Error fetching stock documents lines: ", error);
    return null;
  }
}

