import axios from "axios";
import url from "../utils/axios";
import { Dispatch, SetStateAction } from "react";

export type FetchDataContextParams = {
  setItemList?: Dispatch<SetStateAction<Article[]>>;
  setClientList?: Dispatch<SetStateAction<Client[]>>;
  setEventList?: Dispatch<SetStateAction<appEvent[]>>;
};

export async function fetchItems(setItemList: Dispatch<SetStateAction<Article[]>>) {
  try {
    const response = await axios.get(`${url.heroku}/articlePG`);
    setItemList(response.data.rows);
  } catch (error) {
    console.error('Error fetching items: ', error);
  }
}

export async function fetchClients(setClientList: Dispatch<SetStateAction<Client[]>>) {
  try {
    const response = await fetch(`${url.heroku}/customerPG`);
    const data = await response.json();
    setClientList(data.rows);

  } catch (error) {
    console.error('Error fetching clients: ', error);
  }
}

export async function fetchEvents(setEventList: Dispatch<SetStateAction<appEvent[]>>) {
  try {
    const response = await fetch(`${url.heroku}/event`);
    const data = await response.json();
    setEventList(data.rows);

  } catch (error) {
    console.error('Error fetching events: ', error);
  }
}
