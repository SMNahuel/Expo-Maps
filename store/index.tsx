import { StoreState } from "@/types/interface";
import axios from "axios";
import create from "zustand";

// Define la interfaz para un punto de interés (POI)

// Define la interfaz del estado global

// Crea el store con Zustand
const useStore = create<StoreState>((set) => ({
  coordinates: "",
  data: [],
  pois: {},
  init: async () => {
    const {data} = await axios.get("https://cityme-services.prepro.site/app_dev.php/api/districts/2")
    console.log(data)
  },
}));

export default useStore;
