import { Film } from "./film";
import { Specie } from "./specie";
import { Starship } from "./starship";
import { Vehicle } from "./vehicle";

export type Person = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  species: string[];
};
