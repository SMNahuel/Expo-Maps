import { Coordinate } from "@/types/interface";
import axios from "axios";
import {create} from "zustand";

// Define la interfaz para un punto de interés (POI)

// Define la interfaz del estado global

// Crea el store con Zustand
const useAuthStore = create<any>((set: any) => ({
  pois: [],
  loading: true,
  coordinates: [],
  init: async () => {
    const { data } = await axios.get(
      "https://cityme-services.prepro.site/app_dev.php/api/districts/2"
    );
    
    const coordinates: Coordinate[] | undefined = data?.coordinates
    .split(" ")
    .map((coord: String) => {
      const [longitude, latitude, _] = coord.split(",").map(Number);
      return { longitude, latitude };
    });
    
    set({ pois: data, loading: false, coordinates: coordinates });
  },
}));

export default useAuthStore;
