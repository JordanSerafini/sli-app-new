import axios from "axios";
import url from "../utils/axios";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../types/item";
import { Customer } from "../types/customer";


export type FetchDataContextParams = {
  setItemList?: Dispatch<SetStateAction<Item[]>>;
  setClientList?: Dispatch<SetStateAction<Customer[]>>;
};

export async function fetchItems(setItemList: Dispatch<SetStateAction<Item[]>>) {
  try {
    const response = await axios.get(`${url.local}/itemNew`);
    setItemList(response.data.rows);
  } catch (error) {
    console.error('Error fetching items: ', error);
  }
}

export async function fetchClients(setClientList: Dispatch<SetStateAction<Customer[]>>) {
  try {
    const response = await fetch(`${url.local}/customerNew`);
    const data = await response.json();
    setClientList(data.rows);

  } catch (error) {
    console.error('Error fetching clients: ', error);
  }
}

